---
layout: post
title: "Fine Lines"
date: 2020-09-18 20:40:00
categories: [programming, art]
excerpt_separator: <!--more-->
---

I love the idea of using simplicity to hint at complexity, particularly using combinations of primitive shapes to imply greater detail. Previously, I attempted to use generative algorithms to recreate existing artwork with triangles. Impressed with the results, I decided to take this one step further, and reproduce images with something even more primitive - lines.

<div class="row">
        <img src="{{ site.url }}/public/assets/generative_art/crosshatch_both.png" style="width: 100%" alt="Generative Crosshatch">
</div>

<!--more-->

Above is the result of my experimentations: self-portraits created from an almost crosshatch-like line shading. Light and shadows are represented by the density (or lack) of lines. Initially these lines were perfectly straight and parallel, but I wanted it to feel more organic and imperfect. This meant writing a simple "hand drawn" line method and having groups of lines intersect at a number of different angles.

There's no genetic algorithm this time, instead, the code takes the input image and views
it as a series of brightness values. It iteratively creates pseudo-random groups of "hand-drawn" lines, comparing the in-progress line sketch with the original image at every step. If a particular region matches its light/dark values, there's no need to draw more lines - its representation of the original image is close enough.

Below are some interesting outputs I achieved on a test image during the development, and before I'd created and refined the method above:

<div class="row">
        <img src="{{ site.url }}/public/assets/generative_art/pearl_crosshatch.png" style="width: 100%" alt="Generative Crosshatch">
</div>

The end outcome is really interesting! The line density and therefore general shading is enough to imply the subject, and whilst abstract, still appear recognisable.
