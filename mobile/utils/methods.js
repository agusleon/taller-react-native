const getDistanceBetweenTwoPoints = (point_one, point_two) => {

    var R = 6371.0710; // Radius of the Earth in km
    var rlat1 = point_one.latitude * (Math.PI/180); // Convert degrees to radians
    var rlat2 = point_two.latitude * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (point_two.longitude - point_one.longitude) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d * 1000; //meters
}

export {getDistanceBetweenTwoPoints}
