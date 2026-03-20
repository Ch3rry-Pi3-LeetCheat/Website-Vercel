export type TopicLink = {
  label: string;
  description?: string;
  href: string;
};

export const mathematicsTracks: TopicLink[] = [
  {
    label: "Linear Algebra",
    description:
      "From notation and vectors to eigenvalues, decompositions, and applied matrix thinking.",
    href: "/mathematics/linear-algebra",
  },
];

export const linearAlgebraPhases: TopicLink[] = [
  {
    label: "Prerequisites and mathematical language",
    description:
      "Numbers, variables, notation, and the symbolic habits needed before vectors and matrices.",
    href: "/mathematics/linear-algebra/prerequisites-and-mathematical-language",
  },
  {
    label: "Vectors and geometric intuition",
    description:
      "Scalars, vectors, magnitude, distance, normalization, dot products, and the first geometric mental models.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition",
  },
  {
    label: "Subspaces, basis, and dimension",
    description:
      "Span, independence, basis, dimension, and the structure underneath vector spaces.",
    href: "/mathematics/linear-algebra#phase-subspaces",
  },
  {
    label: "Systems, matrices, and transformations",
    description:
      "Linear systems, matrix operations, elimination, and why matrices act like transformations.",
    href: "/mathematics/linear-algebra#phase-systems",
  },
  {
    label: "Eigenvalues, orthogonality, and decompositions",
    description:
      "Diagonalization, least squares, spectral ideas, and the main factorization toolkit.",
    href: "/mathematics/linear-algebra#phase-advanced",
  },
];

export const linearAlgebraPrerequisiteLessons: TopicLink[] = [
  {
    label: "Numbers, variables, and algebraic notation",
    description:
      "The first lesson: read symbols correctly, evaluate expressions, and stop notation from blocking the ideas.",
    href: "/mathematics/linear-algebra/prerequisites-and-mathematical-language/numbers-variables-and-algebraic-notation",
  },
  {
    label: "Functions, graphs, and mappings",
    description:
      "Understand input-output rules, see how equations become graphs, and build the language that later powers transformations.",
    href: "/mathematics/linear-algebra/prerequisites-and-mathematical-language/functions-graphs-and-mappings",
  },
  {
    label: "Coordinate plane and geometric points",
    description:
      "Place ordered pairs on axes, interpret location geometrically, and build the first visual bridge toward vectors.",
    href: "/mathematics/linear-algebra/prerequisites-and-mathematical-language/coordinate-plane-and-geometric-points",
  },
  {
    label: "Solving simple equations and rearranging expressions",
    description:
      "Use inverse operations, isolate symbols carefully, and rearrange formulas without breaking equality.",
    href: "/mathematics/linear-algebra/prerequisites-and-mathematical-language/solving-simple-equations-and-rearranging-expressions",
  },
  {
    label: "Sigma notation and basic mathematical notation",
    description:
      "Read summation symbols, subscripts, and compact notation without losing the underlying meaning.",
    href: "/mathematics/linear-algebra/prerequisites-and-mathematical-language/sigma-notation-and-basic-mathematical-notation",
  },
];

export const linearAlgebraVectorLessons: TopicLink[] = [
  {
    label: "Scalars, vectors, and vector notation",
    description:
      "Distinguish single numbers from vectors, read vector notation, and build the first geometric intuition.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/scalars-vectors-and-vector-notation",
  },
  {
    label: "Vector addition and scalar multiplication",
    description:
      "Combine vectors component by component, scale them with numbers, and connect the algebra to the geometric picture.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/vector-addition-and-scalar-multiplication",
  },
  {
    label: "Magnitude, distance, and normalization",
    description:
      "Measure vector length, interpret distance as the size of a difference, and turn nonzero vectors into unit vectors.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/magnitude-distance-and-normalization",
  },
  {
    label: "Dot product and geometric meaning",
    description:
      "Compute dot products component by component, read them as alignment, and connect the algebra to angles and perpendicularity.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/dot-product-and-geometric-meaning",
  },
  {
    label: "Angles between vectors",
    description:
      "Use the dot product and magnitudes to solve for the actual angle between two nonzero vectors.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/angles-between-vectors",
  },
  {
    label: "Projections of one vector onto another",
    description:
      "Extract the part of one vector that lies along a chosen direction, as either a signed amount or a new vector.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/projections-of-one-vector-onto-another",
  },
  {
    label: "Linear combinations",
    description:
      "Build new vectors by scaling and adding existing ones, and see how coefficients act like a recipe for direction.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/linear-combinations",
  },
  {
    label: "Span of vectors",
    description:
      "Move from one recipe to the whole set of reachable vectors, and see when directions give a line or a plane.",
    href: "/mathematics/linear-algebra/vectors-and-geometric-intuition/span-of-vectors",
  },
];

export const linearAlgebraSubspaceLessons: TopicLink[] = [
  {
    label: "Lines and planes as sets of vectors",
    description:
      "See lines and planes as whole sets generated from a point and one or two direction vectors.",
    href: "/mathematics/linear-algebra/subspaces-basis-and-dimension/lines-and-planes-as-sets-of-vectors",
  },
];
