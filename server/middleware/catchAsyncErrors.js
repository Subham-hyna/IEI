module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};
  
//BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
