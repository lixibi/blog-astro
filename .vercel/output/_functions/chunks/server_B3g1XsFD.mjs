import { g as getEnv, c as createInvalidVariablesError, s as setOnSetGetEnv } from './runtime_B_ArrQwT.mjs';

function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== void 0 ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== void 0 && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== void 0 && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== void 0 && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== void 0 && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== void 0 && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== void 0 && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== void 0 && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== void 0 && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== void 0 && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== void 0 && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== void 0 && !(num <= max)) {
    errors.push("max");
  }
  if (int !== void 0) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const isOptional = options.optional || options.default !== void 0;
  if (isOptional && value === void 0) {
    return {
      ok: true,
      value: options.default
    };
  }
  if (!isOptional && value === void 0) {
    return {
      ok: false,
      errors: ["missing"]
    };
  }
  return selectValidator(options)(value);
}

const schema = {"WEBMENTION_API_KEY":{"context":"server","access":"secret","type":"string","optional":true},"WEBMENTION_URL":{"context":"client","access":"public","type":"string","optional":true},"WEBMENTION_PINGBACK":{"context":"client","access":"public","type":"string","optional":true},"OAUTH_GITHUB_CLIENT_ID":{"context":"server","access":"secret","type":"string"},"OAUTH_GITHUB_CLIENT_SECRET":{"context":"server","access":"secret","type":"string"},"PUBLIC_DECAP_CMS_SRC_URL":{"context":"client","access":"public","optional":true,"default":"","type":"string"},"PUBLIC_DECAP_CMS_VERSION":{"context":"client","access":"public","optional":true,"default":"3.3.3","type":"string"},"OAUTH_GITHUB_REPO_ID":{"context":"server","access":"secret","optional":true,"default":"","type":"string"}};

// @ts-check

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};

// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `reset` is used by the generated code
// biome-ignore lint/correctness/noUnusedVariables: `reset` is used by the generated code
setOnSetGetEnv((reset) => {
	WEBMENTION_API_KEY = reset ? undefined : _internalGetSecret("WEBMENTION_API_KEY");
OAUTH_GITHUB_CLIENT_ID = reset ? undefined : _internalGetSecret("OAUTH_GITHUB_CLIENT_ID");
OAUTH_GITHUB_CLIENT_SECRET = reset ? undefined : _internalGetSecret("OAUTH_GITHUB_CLIENT_SECRET");
OAUTH_GITHUB_REPO_ID = reset ? undefined : _internalGetSecret("OAUTH_GITHUB_REPO_ID");

});
let WEBMENTION_API_KEY = _internalGetSecret("WEBMENTION_API_KEY");
let OAUTH_GITHUB_CLIENT_ID = _internalGetSecret("OAUTH_GITHUB_CLIENT_ID");
let OAUTH_GITHUB_CLIENT_SECRET = _internalGetSecret("OAUTH_GITHUB_CLIENT_SECRET");
let OAUTH_GITHUB_REPO_ID = _internalGetSecret("OAUTH_GITHUB_REPO_ID");

export { OAUTH_GITHUB_CLIENT_ID as O, WEBMENTION_API_KEY as W, OAUTH_GITHUB_CLIENT_SECRET as a, OAUTH_GITHUB_REPO_ID as b };
