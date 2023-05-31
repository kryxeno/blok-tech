# Templating

To make dynamic pages, a developer can make blueprints that change depending on the data that is being served. This way you can have thousands of records and still have a functioning application.

# Research

I researched PUG and EJS, and I ultimately chose EJS.

## Ejs

```
<main class="cv-list">
    <% filteredUsers.forEach((user, index) => { %>
    <section class="cv">
        <header>
        <div>
            <h1><%- user.firstName %> <%- user.lastName %></h1>
            <h2><%- user.job %> | <%- user.age %></h2>
        </div>
        <img src="<%- user.image %>" alt="profile picture">
        </header>
```

I picked EJS because it is somewhat similar to Django (a python templating engine). This is because I used Django during my internship.

It also had a bit more documentation in the hva repo.
I like how you can pass data to the engine, how you can extend templates and that you can write inline logic is a nice bonus. I prefer how Ejs handles these things. It feels more like standard js.

## Pug

```
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5);
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

Pug looks very much like python, where indentation is very important for the function of the code, instead of having closing tags.

I personally don't really enjoy this type of coding, as it can introduce some unecesssary bugs by having a tab wrong or something similar.

Pug also fuses js and html together which can sometimes lead to confusion and less readable code.

I have a good amount of extra packages.

I have express, eslint, nodemon, sass, axios, css-init, lodash and obviously mongo.
