class WordList {
    constructor () {
        this._nouns = [];
        this._adjectives = [];
        this._verbs = [];
        this._prefixes = [];
    }

    addPrefixes(...prefixes) {
        for (const p of prefixes) {
            this._prefixes.push(p);
        }
    }

    addNouns(...pairs) {
        for (const n of pairs) {
            let [s, p] = n;
            if (!s || !p)
                throw new Error("Parameter undefined.");
            this._nouns.push({"s": s, "p": p});
        }        
    }

    addAdjective(...adjectives) {
        for (const a of adjectives) {
            if (!a)
                throw new Error("Parameter undefined.");
            this._adjectives.push(a);
        }        
    }

    getNoun(pluralProb=0) {
        let w = this._rchoice(this._nouns);
        if (Math.random() > (1.0 - pluralProb))
            return w.p;
        return w.s;
    }

    getAdjective() {
        let w = this._rchoice(this._adjectives);
        return w;
    }

    getPrefix() {
        return this._rchoice(this._prefixes);
    }

    /**
     * Tries to figure out the indefinite article for a noun.
     * @param {string} w The noun to get an article for.
     */
    guessIndefiniteArticle(w) {
        let char = w.toLowerCase()[0];
        if (char in ["a", "o", "u", "e", "i"])
            return "an";
        return "a";
    }

    /**
     * Chose a random item from a list.
     * @param {Array} lst A list of Ts.
     */
    _rchoice(lst) {
        if (lst.length < 1)
            return undefined;
        return lst[Math.round(Math.random() * (lst.length-1))];
    }
}

function getBandName(genre) {

    let pbWords = new WordList();
    pbWords.addNouns(["Carbon", "Carbon"], ["Sol", "Sols"], ["Field", "Fields"],
        ["Ellipse", "Ellipses"], ["Slope", "Slopes"], ["Layer", "Layers"], 
        ["Sphere", "Spheres"], ["Memory", "Memories"], ["Star", "Stars"],
        ["Nova", "Novae"], ["Connection", "Connections"], ["Light", "Lights"],
        ["Orbit", "Orbits"], ["Prism", "Prisms"], ["Disc", "Discs"], ["Line", "Lines"],
        ["Parsec", "Parsecs"], ["Space", "Spaces"], ["Cube", "Cubes"], ["Logic", "Logic"],
        ["Satellite", "Satellites"], ["Biology", "Biologies"], ["Garden", "Gardens"],
        ["Gaia", "Gaias"], ["Parabola", "Parabolas"], ["Habitat", "Habitats"],
        ["Eon", "Eons"], ["Ship", "Ships"], ["Chip", "Chips"], ["Circuit", "Circuits"],
        ["Arithmetic", "Arithmetic"], ["Strata", "Stratas"], ["Noise", "Noise"],
        ["Pipeline", "Pipelines"], ["Assembly", "Assemblies"], ["Radius", "Radii"],
        ["Scanner", "Scanners"], ["Protocol", "Protocols"], ["Transmission", "Transmissions"],
        ["Grid", "Grids"], ["Synapse", "Synapses"], ["Ascent", "Ascents"], ["Descent", "Descents"],
        ["Halo", "Halos"], ["Horizon", "Horizons"], ["Optic", "Optics"], ["Limit", "Limits"],
        ["Locus", "Locii"], ["Universe", "Universes"], ["String", "Strings"],
        ["Gravity", "Gravity"], ["Absolute", "Absolutes"], ["Module", "Modules"],
        ["Reflection", "Reflections"], ["Cloud", "Clouds"], ["Refraction", "Refractions"],
        ["Hyperbola", "Hyperbolas"], ["Distortion", "Distortions"], ["Glitch", "Glitches"],
        ["End", "Endings"], ["Graviton", "Gravitons"], ["Vector", "Vectors"], 
        ["Matrix", "Matrices"], ["Route", "Routes"], ["Base", "Bases"], ["Energy", "Energies"],
        ["Particle", "Particles"], ["Emission", "Emissions"], ["Religion", "Religions"],
        ["Radio", "Radios"], ["Hydrogen", "Hydrogen"], ["Neon", "Neon"], ["Nitrogen", "Nitrogen"], ["Spirit", "Spirits"], ["Being", "Beings"], ["Deity", "Deities"],
        ["Wave", "Waves"], ["Probe", "Probes"], ["Crystal", "Crystals"], ["Kush", "Kush"], ["Plant", "Plants"],
        ["Node", "Nodes"], ["Sentience", "Sentience"], ["State", "States"], ["Machine", "Machines"], 
        ["Program", "Programs"], ["Routine", "Routines"], ["Procedure", "Procedures"], ["Structure", "Structures"]);

    pbWords.addAdjective("Horizontal", "Vertical", "Distorted", "Emitted", "Warped",
    "Transformed", "Arbitrary", "Neurological", "Neurosomatic", "Somatic", "Haptic", "Analog", "Orbital", "Digital", "Numeric", "Astronomical",
    "Hydroponic", "Tubular", "Ancient", "Lost", "Abandoned", "Continuous",
    "Absent", "Empty", "Spherical", "Blue", "Red", "Green", "Yellow", "Alien",
    "Implicit", "Explicit", "Canonical", "Enumerated", "Telepathic", "Autonomous",
    "Sentient", "Robotic", "Quiescent", "Defined", "Hyperbolic", "Nascent", "Cumbrian",
    "Inverted", "Equivalent", "Galactical", "Spiritual", "Transcending",
    "Loving", "Psychotropic", "Stratospheric", "Motherly", "Familiar", "Polar", "Aligned", 
    "Triangular", "Amorphous", "Quantum", "Silent", "Refractive", "Reflective", 
    "Modular", "Interstellar", "Stellar", "Cybernetic", "Orbiting", "Interpolated", "Extrapolated", "Bicubic", "Anistropic",
    "Magenta", "Cyan", "Black", "Stimulating", "Oscillating", "Rebounding", "White", "Artificial", "Spectral", "Monolithic", "Nodular", "Mental");
    
    pbWords.addPrefixes("Bi", "Tri", "Multi", "Pre");

    function psybientBandName() {

        var name = "";
        if (Math.random() < 0.25)
        {
            name = pbWords.getNoun(pluralProb=0.1) + " of ";
            if (Math.random() > 0.3)
                name += pbWords.getNoun(pluralProb=1.0);
            else
            {
                let singular = pbWords.getNoun();
                name += " " + pbWords.guessIndefiniteArticle(singular) + " " + singular;
            }
        } else {
            let wprob = Math.random();
            name = Math.random() > 0.5? (Math.random() < 0.25? pbWords.getPrefix() + "-" : "") + pbWords.getAdjective() : pbWords.getNoun(pluralProb=0);
            if (wprob < 0.7) 
            {
                name += " " + pbWords.getNoun(pluralProb=0.3);
            } else {
                name += " " + (Math.random() < 0.15? pbWords.getPrefix() + "-" : "") + pbWords.getNoun() + " " + pbWords.getNoun(pluralProb=0.3);                
            }
        }
        return name.trim();
    }

    if (genre=="psybient")
    {
        return psybientBandName();
    }

    throw new Error("Unknown genre.");
}