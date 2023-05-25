# Deployment

Over the past two years I have found that following these rules have improved the quality of my code by a lot.

# Readable code (functions)

Generally when writing code I tend to throw a lot of operations together in the location it is needed. For example in a onClick function I just list all the things that need to happen on click. This get really messy really fast, which is why I am only writing readable code now. If it isnt instantly clear what a line or group of lines of code does, I make another function with a name that clears that up. For example, if I map through a list while filtering and finding a certain key or value, I separate that, as such mapping functions can just be replaced with 'getPropertyWithValueFromList(value, array)'. In this case the function can be moved into a utils file, as it is a general function.

# Naming conventions

Like naming js components with a capital (ListView), functions without first capital (getAllData), maps or similar objects with all capital and lowercase (COLOR_VALUES) etc...

# Never leave todo's, logs or commented code in my code

I also used to leave unfinished code that didn't break anything, but if there is one thing I learn is that you tend to forget code you are not actively writing or tracking. Things like temporary colors instead of getting them right the first time. I sometimes forgot changing them before it had already reached production.

There are other rules but I don't think they are as important as these three, like the way I stack my css or code in general.
