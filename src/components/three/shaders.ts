/** Soft volumetric light shaft. Rendered on an open cone with additive blending. */
export const beamVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const beamFragment = /* glsl */ `
  uniform float uIntensity;
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    float facing = pow(abs(dot(normalize(vNormalW), normalize(vViewDir))), 2.2);
    float along = smoothstep(0.0, 0.35, vUv.y) * (0.55 + 0.45 * vUv.y); // uv.y = 1 at the window, 0 at the desk
    float flicker = 0.75 + 0.25 * noise(vec2(vUv.x * 7.0, vUv.y * 3.0 - uTime * 0.12));
    float a = facing * along * flicker * uIntensity * 0.38;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

/** Floating dust that glows when it drifts through the light shaft. */
export const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uBeamOrigin;
  uniform vec3 uBeamDir;
  uniform float uBeamRadius;
  attribute float aSeed;
  varying float vGlow;
  varying float vSeed;
  void main() {
    vec3 p = position;
    float t = uTime * (0.05 + aSeed * 0.05);
    p.x += sin(t + aSeed * 31.0) * 0.35;
    p.y += sin(t * 0.7 + aSeed * 17.0) * 0.25 + mod(uTime * 0.02 * (0.5 + aSeed), 1.0) * 0.3;
    p.z += cos(t * 0.8 + aSeed * 11.0) * 0.3;
    vec4 world = modelMatrix * vec4(p, 1.0);

    vec3 toP = world.xyz - uBeamOrigin;
    float proj = max(dot(toP, uBeamDir), 0.0);
    float dist = length(toP - uBeamDir * proj);
    float radius = uBeamRadius * (0.15 + proj * 0.12);
    vGlow = 0.18 + smoothstep(radius, 0.0, dist) * 1.4;
    vSeed = aSeed;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.4 + aSeed) * (8.0 / -mv.z);
  }
`;

export const dustFragment = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uColor;
  varying float vGlow;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.0, d);
    a *= a * uOpacity * vGlow * (0.5 + vSeed * 0.5);
    gl_FragColor = vec4(uColor * a, a);
  }
`;
