const ImageFilters = {
    blur: async (elem) => elem.blur(3),
    grayscale:async (elem) => await elem.greyscale(),
    invert:async (elem) => await elem.invert(),
    contrast:async (elem) => await elem.contrast(0.4),
    sepia:async (elem) => await elem.sepia(),
    brightness:async (elem) => await elem.brightness(-0.6),
    turn:async (elem) => await elem.flip(true, false)
};

module.exports = ImageFilters;