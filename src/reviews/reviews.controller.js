const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

//? MIDDLEWARE

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.rewviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found` });
}

function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if ((req, params.movieId)) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function list(req, res) {
  const data = await service.list(req.params.movieId);
  res.json({ data });
}
async function destroy(req, res) {
  await service.destroy(res.locals.reviews.review_id);
  res.sen;
  dStatus(204);
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

module.exports = {
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
