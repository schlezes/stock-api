# stock-api

This repository is a chance to view a stock price versus time in a spiral format.

This idea was proposed by Gann in definition of a square of 9 table to visualize support and resistance angles as defined by the square of 9 location superimposed upon a 360-degree circle.

For example,

  all squares of even numbers: 4, 16, 36, 64 all fall on the 135-degree angle.
and,
  all squares of odd numbers:  1, 9, 25, 49, 81 fall on the 315-degree angle.

With that, attached below is an example of that calculation.


![unit-price](https://user-images.githubusercontent.com/89032071/166734561-f43e82d6-d76d-43a2-982c-3749f90e597b.png)


This second image is a screenshot render of prices plotted upon the spiral as downloaded from the DJIA API, last 100 days of trade.

I selected the price range between $3000 and $3100 for the purpose of simplifying the visualization of price movement.

The stock has been trading in the +/- $3000 range during the last 100 days.

Green dots are price up for the day, from the day before.

Red dots are price down for the day, from the day before.

All dots are the price close for the day.

Clockwise rotation is price increase. A blue pie indicates price increased for the day, usually from a red dot.

Counter-clockwise is price decrease.   A red pie indicates a price decrease for the day, usually from a green dot.


![stock-api](https://user-images.githubusercontent.com/89032071/166616575-2ece129b-2617-4fda-bed5-14b2468b8c8b.png)


My idea was to visualize differently some sort of indicator to substantiate some Gann definitions of support or resistance angles as the stock price moved along the spiral, forward or backward.

For example, I would expect a "bunching" of dots at a location of resistance or support.

or,

For example. I would expect a "bunching" of dots at a location where time squared = price.

In both cases, maybe an instance of a signal to reversal.

I began this project in 2020 as a chance to present a paper at Data Con LA.

My idea for big data was the extraction of stock price from the DJIA API and use-it for some useful purpose.

I was not selected for the presentation; however, I was satisfied with the code that evolved.

Straight vanilla JavaScript, CSS and HTML.

At this time, there could be some revisions to this project to make-it more useful.

Until then,

I am posting the code, except for my key.

You will have to get your own key from Alpha Advantage.

Thanks,

Vince Schlezes


