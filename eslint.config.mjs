import{defineConfig,globalIgnores}from"eslint/config";
importnextVitalsfrom"eslint-config-next/core-web-vitals";
importnextTsfrom"eslint-config-next/typescript";

consteslintConfig=defineConfig([
...nextVitals,
...nextTs,
//Overridedefaultignoresofeslint-config-next.
globalIgnores([
//Defaultignoresofeslint-config-next:
".next/**",
"out/**",
"build/**",
"next-env.d.ts",
]),
]);

exportdefaulteslintConfig;
