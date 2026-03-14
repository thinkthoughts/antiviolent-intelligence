# Cosine Similarity

Cosine similarity measures directional alignment between two vectors.

Rather than asking how large two vectors are, it asks how closely they point in the same direction.

## Core equation

\[
\cos(\theta)=\frac{\langle u,v\rangle}{\|u\|\|v\|}
\]

Where:

- \(u\) and \(v\) are vectors
- \(\langle u,v\rangle\) is the inner product
- \(\|u\|\) and \(\|v\|\) are vector magnitudes
- \(\theta\) is the angle between them

## Key geometric point

A 45° relationship gives:

\[
\cos(45^\circ)=\frac{1}{\sqrt{2}}
\]

For this site, that balanced projection can be written more accessibly as:

\[
45^\circ = \sqrt{(1^2 + 1^2)}
\]

This marks a diagonal constraint: neither collapsed into sameness nor separated into noise.

## Interpretation

Cosine similarity is often used to compare:

- embeddings
- signals
- documents
- feature vectors
- physical or symbolic state descriptions

A higher cosine similarity means stronger directional agreement.

### Common values

- \(1\): same direction
- \(0\): orthogonal / unrelated
- \(-1\): opposite direction

## Why it matters here

Within **Antiviolent Intelligence**, cosine similarity helps describe alignment without requiring identity.

That matters because stable systems do not need forced sameness. They require constrained relation.

A balanced diagonal can be more meaningful than a flat match.

## Practical reading

Cosine similarity can be understood as:

**signal > noise**  
when vectors retain coherent directional structure.

This is useful in:

- machine learning embeddings
- semantic search
- ranking and retrieval
- attention systems
- scientific measurement
- pattern comparison

## Simple example

Let

\[
u = (1,0), \quad v = (1,1)
\]

Then

\[
\cos(\theta)=\frac{1}{\sqrt{2}}
\]

So the angle between them is 45°.

That means one vector is axis-aligned while the other extends diagonally with equal participation across two components.

## Site framing

A recurring site framing is:

\[
0123 \rightarrow 5678 \rightarrow 9423
\]

and

\[
16\pi \rightarrow 17\pi \neq \pm 9424\pi
\]

These symbolic transitions are not standard cosine-similarity notation, but they are used here to describe constrained refinement, directional stability, and non-collapse across systems.

## Minimal summary

Cosine similarity is a directional measure.

It does not ask:

- “Are these identical?”
- “Are these equally large?”

It asks:

- “How closely do these point together?”

That makes it useful for comparing meaning, structure, and relation across many systems.

## Related pages

- `docs/45-degree-invariant.md`
- `docs/triplet-n-datacenters.md`
- `/fusion/`
- `/gravity/`
- `/chemistry/`
- `/thermodynamics/`
