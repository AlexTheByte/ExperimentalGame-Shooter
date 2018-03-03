function floorAABBCollision(rectangle) {
    if(rectangle.y + rectangle.height > canvas.height) {
        return true;
    }
    else {
        return false;
    }
}