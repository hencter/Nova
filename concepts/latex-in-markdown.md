---
type: Concept
title: "LaTeX in Markdown"
description: Complete reference for embedding LaTeX math in markdown — syntax, symbols, environments, matrices, alignment, and formal knowledge representation including logic, information theory, linear algebra, and the attention mechanism formula.
tags:
  - latex
  - math
  - notation
  - markdown
  - formal-methods
timestamp: 2026-06-22T14:20:00Z
id: "20260622T142000"
status: evergreen
difficulty: intermediate
domain: technical-writing
prerequisites:
  - /concepts/markdown-frontmatter.md
related:
  - "[[mermaid-diagrams|Mermaid Diagrams]]"
  - "[[markdown-frontmatter|Markdown Frontmatter]]"
  - "[[attention-mechanism|Attention Mechanism]]"
  - "[[okf-format|OKF Format]]"
sources:
  - title: "MathJax Documentation"
    url: "https://docs.mathjax.org/en/latest/"
  - title: "Obsidian Help — Math"
    url: "https://help.obsidian.md/Editing+and+formatting/Advanced+formatting+syntax#Math"
  - title: "LaTeX Mathematical Symbols"
    url: "https://www.overleaf.com/learn/latex/List_of_Greek_letters_and_math_symbols"
confidence: 0.95
summary: >-
  LaTeX math in markdown uses `$...$` for inline and `$$...$$` for display math,
  supporting full equation environments, matrix types, alignment, and formal notation
  across logic, set theory, information theory, and machine learning.
---

# LaTeX in Markdown

> Mathematical notation as a first-class citizen in your knowledge base.

## Math Syntax

LaTeX math in markdown uses standard delimiters:

```markdown
Inline math: $E = mc^2$

Display (block) math:
$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

Obsidian renders LaTeX using **MathJax**, supporting the full LaTeX math environment. Other platforms (GitHub, Notion) may have limited or no support.

## Common Symbols Reference

### Greek Letters

| LaTeX | Rendered | LaTeX | Rendered |
|-------|----------|-------|----------|
| `\alpha` | $\alpha$ | `\beta` | $\beta$ |
| `\gamma` | $\gamma$ | `\delta` | $\delta$ |
| `\epsilon` | $\epsilon$ | `\pi` | $\pi$ |
| `\sigma` | $\sigma$ | `\omega` | $\omega$ |
| `\Gamma` | $\Gamma$ | `\Delta` | $\Delta$ |
| `\Theta` | $\Theta$ | `\Pi` | $\Pi$ |
| `\Sigma` | $\Sigma$ | `\Omega` | $\Omega$ |

### Set Theory

| LaTeX | Rendered | Meaning |
|-------|----------|---------|
| `\emptyset` | $\emptyset$ | Empty set |
| `\in` | $\in$ | Element of |
| `\notin` | $\notin$ | Not element of |
| `\subset` | $\subset$ | Subset |
| `\supset` | $\supset$ | Superset |
| `\cup` | $\cup$ | Union |
| `\cap` | $\cap$ | Intersection |
| `\forall` | $\forall$ | For all |
| `\exists` | $\exists$ | There exists |

### Logic

| LaTeX | Rendered | Meaning |
|-------|----------|---------|
| `\land` | $\land$ | Logical AND |
| `\lor` | $\lor$ | Logical OR |
| `\lnot` | $\lnot$ | Negation |
| `\implies` | $\implies$ | Implication |
| `\iff` | $\iff$ | If and only if |
| `\top` | $\top$ | True (top) |
| `\bot` | $\bot$ | False (bottom) |

### Relations and Arrows

| LaTeX | Rendered | LaTeX | Rendered |
|-------|----------|-------|----------|
| `\leq` | $\leq$ | `\geq` | $\geq$ |
| `\neq` | $\neq$ | `\approx` | $\approx$ |
| `\equiv` | $\equiv$ | `\sim` | $\sim$ |
| `\propto` | $\propto$ | `\rightarrow` | $\rightarrow$ |
| `\leftarrow` | $\leftarrow$ | `\leftrightarrow` | $\leftrightarrow$ |
| `\Rightarrow` | $\Rightarrow$ | `\mapsto` | $\mapsto$ |

### Operators

| LaTeX | Rendered | LaTeX | Rendered |
|-------|----------|-------|----------|
| `\times` | $\times$ | `\div` | $\div$ |
| `\cdot` | $\cdot$ | `\pm` | $\pm$ |
| `\oplus` | $\oplus$ | `\otimes` | $\otimes$ |
| `\sum` | $\sum$ | `\prod` | $\prod$ |
| `\int` | $\int$ | `\oint` | $\oint$ |

## Fractions, Superscripts, Subscripts, Roots

### Fractions

$$
\frac{\text{numerator}}{\text{denominator}} \qquad
\binom{n}{k} \qquad
\frac{d}{dx}f(x) \qquad
\frac{\partial}{\partial x}
$$

```latex
\frac{numerator}{denominator}
\binom{n}{k}                     % Binomial coefficient
\frac{d}{dx} f(x)                % Derivative
\frac{\partial}{\partial x}      % Partial derivative
```

### Superscripts and Subscripts

$$
x^2, \quad a_i, \quad a_{ij}, \quad x^{n+1}, \quad a_{i,j}^{k}
$$

$$
\sum_{i=1}^{n} x_i, \quad
\prod_{i=0}^{\infty}, \quad
\int_{0}^{1} f(x) \, dx, \quad
\lim_{x \to \infty} f(x)
$$

### Roots

$$
\sqrt{x}, \quad \sqrt[3]{x}, \quad \sqrt[n]{\frac{a}{b}}
$$

## Matrices

Six matrix types, plus augmented:

$$
\begin{matrix}
a & b \\
c & d
\end{matrix}
\qquad
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\qquad
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

$$
\begin{Bmatrix}
a & b \\
c & d
\end{Bmatrix}
\qquad
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}
\qquad
\begin{Vmatrix}
a & b \\
c & d
\end{Vmatrix}
$$

**Augmented matrix:**

$$
\left[
\begin{array}{cc|c}
a & b & e \\
c & d & f
\end{array}
\right]
$$

```latex
% Basic
\begin{pmatrix}    % parentheses
\begin{bmatrix}    % brackets
\begin{Bmatrix}    % braces
\begin{vmatrix}    % vertical bars (determinant)
\begin{Vmatrix}    % double vertical bars

% Augmented
\left[
\begin{array}{cc|c}
a & b & e \\
c & d & f
\end{array}
\right]
```

## Equation Alignment

### Aligned Environment

$$
\begin{aligned}
f(x) &= x^2 + 2x + 1 \\
     &= (x + 1)^2
\end{aligned}
$$

### Align Environment (Numbered)

$$
\begin{align}
    y &= mx + b \\
    E &= mc^2 \\
    a^2 + b^2 &= c^2
\end{align}
$$

### Cases

$$
f(x) = \begin{cases}
    0   & \text{if } x < 0 \\
    x^2 & \text{if } 0 \leq x \leq 1 \\
    1   & \text{if } x > 1
\end{cases}
$$

## Text and Spacing Commands

$$
\text{This is normal text inside math.}
$$

$$
x = 5 \quad \text{cm}          % \quad = 1em space
\qquad
x = 5 \qquad \text{cm}          % \qquad = 2em space
$$

$$
a\,b \; c \: d \! e            % thin, thick, medium, negative spacing
$$

## Formal Knowledge Representation

### Logical Formulae

**Modus ponens:**

$$
(P \implies Q) \land P \implies Q
$$

**Universal quantification:**

$$
\forall x \in \mathbb{R},\; \exists\, y : y > x
$$

**Bayes' theorem:**

$$
P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}
$$

### Set Theory

**Set builder notation:**

$$
A = \{x \in \mathbb{N} \mid x \text{ is prime}\}
$$

**Intersection definition:**

$$
A \cap B = \{x \mid x \in A \land x \in B\}
$$

**Union cardinality (Principle of Inclusion-Exclusion):**

$$
|A \cup B| = |A| + |B| - |A \cap B|
$$

### Information Theory

**Shannon entropy:**

$$
H(X) = -\sum_{i=1}^{n} p(x_i) \log_2 p(x_i)
$$

Properties:
- $H(X) \geq 0$ (non-negativity)
- $H(X) \leq \log_2 n$ (maximum at uniform distribution)

**Kullback-Leibler divergence:**

$$
D_{KL}(P \parallel Q) = \sum_{x \in \mathcal{X}} P(x) \log \frac{P(x)}{Q(x)}
$$

Note: $D_{KL}(P \parallel Q) \neq D_{KL}(Q \parallel P)$ — asymmetric.

### Linear Algebra

**Matrix notation:**

$$
\mathbf{A} = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}, \quad
\mathbf{A}\mathbf{x} = \mathbf{b}
$$

**Vector notation:**

$$
\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}, \quad
\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^n x_i^2}
$$

**Dot product:**

$$
\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = \|\mathbf{a}\| \|\mathbf{b}\| \cos \theta
$$

### Complexity and Algorithms

**Recurrence relation (Merge Sort):**

$$
T(n) = 2T\!\left(\frac{n}{2}\right) + O(n)
$$

Solution: $T(n) = O(n \log n)$

**Big-O hierarchy:**

$$
O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)
$$

### Attention Mechanism Formula

The core operation of Transformer architectures — **scaled dot-product attention**:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Where:
- $Q \in \mathbb{R}^{n \times d_k}$ — Query matrix
- $K \in \mathbb{R}^{n \times d_k}$ — Key matrix
- $V \in \mathbb{R}^{n \times d_v}$ — Value matrix
- $d_k$ — Dimensionality of key/query vectors
- $\frac{1}{\sqrt{d_k}}$ — Scaling factor to prevent softmax saturation

**Multi-head attention** (concatenation of $h$ parallel attention operations):

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O
$$

$$
\text{where } \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)
$$

All parameter matrices: $W_i^Q \in \mathbb{R}^{d_\text{model} \times d_k}$, $W_i^K \in \mathbb{R}^{d_\text{model} \times d_k}$, $W_i^V \in \mathbb{R}^{d_\text{model} \times d_v}$, $W^O \in \mathbb{R}^{hd_v \times d_\text{model}}$

This notation enables precise, unambiguous communication of mathematical concepts within knowledge bases. Combined with [[mermaid-diagrams|Mermaid diagrams]], it provides complete formal and visual knowledge representation.

# Citations

[1] [MathJax Documentation](https://docs.mathjax.org/en/latest/)
[2] [Overleaf: List of Greek letters and math symbols](https://www.overleaf.com/learn/latex/List_of_Greek_letters_and_math_symbols)
[3] [Vaswani et al., "Attention Is All You Need" (2017)](https://arxiv.org/abs/1706.03762)
