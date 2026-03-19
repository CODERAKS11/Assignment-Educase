function isBlank(value) {
  return typeof value !== "string" || value.trim().length === 0;
}

function parseCoordinate(value, fieldName, errors) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    errors[fieldName] = `${fieldName} must be a valid number`;
    return null;
  }

  if (fieldName === "latitude" && (parsedValue < -90 || parsedValue > 90)) {
    errors[fieldName] = "latitude must be between -90 and 90";
    return null;
  }

  if (fieldName === "longitude" && (parsedValue < -180 || parsedValue > 180)) {
    errors[fieldName] = "longitude must be between -180 and 180";
    return null;
  }

  return parsedValue;
}

function validateSchoolPayload(payload) {
  const errors = {};

  if (isBlank(payload.name)) {
    errors.name = "name is required";
  }

  if (isBlank(payload.address)) {
    errors.address = "address is required";
  }

  const latitude = parseCoordinate(payload.latitude, "latitude", errors);
  const longitude = parseCoordinate(payload.longitude, "longitude", errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    value: {
      name: typeof payload.name === "string" ? payload.name.trim() : payload.name,
      address:
        typeof payload.address === "string"
          ? payload.address.trim()
          : payload.address,
      latitude,
      longitude
    }
  };
}

function validateUserCoordinates(query) {
  const errors = {};
  const latitude = parseCoordinate(query.latitude, "latitude", errors);
  const longitude = parseCoordinate(query.longitude, "longitude", errors);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    value: {
      latitude,
      longitude
    }
  };
}

module.exports = {
  validateSchoolPayload,
  validateUserCoordinates
};
