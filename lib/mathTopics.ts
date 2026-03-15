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
      "Scalars, vectors, magnitude, dot product, and the first geometric mental models.",
    href: "/mathematics/linear-algebra#phase-vectors",
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
];
