/**
 * Forces range to [0:2PI)
 * @param rad: input angle in radians
 * @return the same angle in the range [0:2PI)
 * */
function capToAngularRangeRad(rad: number): number {
  rad = rad % (2 * Math.PI);
  return Math.abs(rad >= 0 ? rad : rad + 2 * Math.PI);
}
/**
 * Converts degrees to radians. Forces range to [0:2PI)
 * @param deg: input angle in degrees.
 * @return the same angle in radians
 * */
function deg2Rad(deg: number): number {
  return capToAngularRangeRad((deg * Math.PI) / 180.0);
}

/**
 * Forces range to [0:360)
 * @param deg: input angle in degrees
 * @return the same angle in the range [0:360)
 * */
function capToAngularRangeDeg(deg: number): number {
  deg = deg % 360.0;
  return Math.abs(deg >= 0 ? deg : deg + 360);
}

/**
 * Converts radians to degrees to radians. Forces range to [0:360)
 * @param rad: input angle in radians.
 * @return the same angle in degrees
 * */
function rad2Deg(rad: number): number {
  return capToAngularRangeDeg((rad * 180) / Math.PI);
}

export { deg2Rad, rad2Deg, capToAngularRangeDeg, capToAngularRangeRad };
