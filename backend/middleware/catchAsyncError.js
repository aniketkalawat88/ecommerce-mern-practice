
// EK type ka try and catch hi hai
module.exports = (theFunc) => (req ,res , next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};