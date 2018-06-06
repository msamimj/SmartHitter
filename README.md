# SmartHitter

Ever faced a situation where you make multiple network requests (of the same type, one after the other) for a website and the data that is desired is the one expected from the last request.
But that doesnot happen as network request times are not constant and therefore things get messed up.

A desirable solution for the situation is to cancel previous requests. But unfortunately, for the fetch API, I could not find any straightforward or intuitive way to do that.
And this module is the result of that.

This module takes smart decisions and returns the data for the latest request only. It achieves that by maintainig a queue (in the form of an array) and check the queue before returning any data.

USAGE:

Simply import the package
Create a new SmartHitter object
Use its hit() function to make network requests

THE hit() FUNCTION:

hit(name, url, method, data)

name: unique name of the request (assigned from client side)
url: url to make the request to
method: POST / GET
data: request body
