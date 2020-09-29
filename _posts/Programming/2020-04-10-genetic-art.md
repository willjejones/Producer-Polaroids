---
layout: post
title: "Evolutionary Art"
date: 2020-04-04 14:20:00
categories: [programming, art]
excerpt_separator: <!--more-->
---

I've loved genetic algorithms ever since first exploring them during my degree; the idea of allowing a population to "evolve" until they produce a suitable solution is something that fascinates me. But until now, all of my existing genetic applications had been to solve more mathematical, academic problems - I wanted to apply the principle to art.

<div class="row">
    <img src="https://s3-eu-west-1.amazonaws.com/willjejones.com/images/generative_art/perl_earrings.png" style="width: 100%" alt="Genetic Art">
</div>

<!--more-->

When I posted the results to my Instagram page, I captioned the post <i>"I’ve been teaching my computer how to make art (sort of...)"</i>. It needed the "sort of", because without it, the statement isn't particularly accurate - the algorithm isn't learning for itself how to copy the art, it's using the principle of natural selection to refine a better version of the image. This is the basis of genetic algorithms. (This <a href="https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3#:~:text=A%20genetic%20algorithm%20is%20a,offspring%20of%20the%20next%20generation.">medium article</a> by Vijini Mallawaarachchi, gives a good overview to those unfamiliar with the concept).

So the question in the context of my artwork was essentially: can I find a way of reproducing some given picture or art, with an initially random population of candidate images that "breed" for a number of generations until I start to see members of newer populations that look like the source image?

I chose to create my initial candidate images from many random triangles, all of different colours and sizes. These candidates would breed (and potentially mutate) at each iteration, creating a new generation of candidates. In my application, these children were created by taking genes (triangles) from each parent, and then in the case of any mutations, applying some additional variation.

A fitness function was required to decide which children to keep at each iteration (this is the part that emulates natural selection - the fittest survive). In some computing problems, the fitness function isn't always immediately obvious, but in this context it was fairly simple - how alike does the candidate look to the original artwork, (by comparing pixels of both images).

<div class="row">
    <div class="column">
        <img src="https://s3-eu-west-1.amazonaws.com/willjejones.com/images/generative_art/mona.jpg" style="width: 100%" alt="Genetic Art">
    </div>
    <div class="column">
        <img src="https://s3-eu-west-1.amazonaws.com/willjejones.com/images/generative_art/genetic.gif" style="width: 100%" alt="Genetic Art">
    </div>
</div>

You can see the process illustrated above - to the left is the source image, and to the right is the algorithm evolving to produce an image that looks more and more like the original. Each frame of the animation is the best candidate from that generation, and as the generations evolve, so does the best image.

From my initial experiments, it produced some really interesting, abstract results. I'll no doubt return to this work in the future and try to improve or at least vary the results, given that there's so much room to tweak the parameters (number of generations, size of population, mutation, way of breeding parents, etc).
