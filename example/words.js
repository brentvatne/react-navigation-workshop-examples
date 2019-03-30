export default `
Some programs output numbers. Other programs output poems. Different languages and their runtimes are often optimized for a particular set of use cases, and React is no exception to that.

React programs usually output a tree that may change over time. It might be a DOM tree, an iOS hierarchy, a tree of PDF primitives, or even of JSON objects. However, usually, we want to represent some UI with it. We’ll call it a “host tree” because it is a part of the host environment outside of React — like DOM or iOS. The host tree usually has its own imperative API. React is a layer on top of it.

So what is React useful for? Very abstractly, it helps you write a program that predictably manipulates a complex host tree in response to external events like interactions, network responses, timers, and so on.

A specialized tool works better than a generic one when it can impose and benefit from particular constraints. React makes a bet on two principles:

Stability. The host tree is relatively stable and most updates don’t radically change its overall structure. If an app rearranged all its interactive elements into a completely different combination every second, it would be difficult to use. Where did that button go? Why is my screen dancing?

Regularity. The host tree can be broken down into UI patterns that look and behave consistently (such as buttons, lists, avatars) rather than random shapes.

These principles happen to be true for most UIs. However, React is ill-suited when there are no stable “patterns” in the output. For example, React may help you write a Twitter client but won’t be very useful for a 3D pipes screensaver.

The host tree consists of nodes. We’ll call them “host instances”.

In the DOM environment, host instances are regular DOM nodes — like the objects you get when you call document.createElement('div'). On iOS, host instances could be values uniquely identifying a native view from JavaScript.

Host instances have their own properties (e.g. domNode.className or view.tintColor). They may also contain other host instances as children.

(This has nothing to do with React — I’m describing the host environments.)

There is usually an API to manipulate host instances. For example, the DOM provides APIs like appendChild, removeChild, setAttribute, and so on. In React apps, you usually don’t call these APIs. That’s the job of React.
`;
