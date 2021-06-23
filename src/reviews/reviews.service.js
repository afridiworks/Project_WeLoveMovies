const {groupBy, select} = require('../db/connection')
const knex = require("../db/connection");

async function destroy(reviewid) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function readCritic(criticId) {
  return knex("critics").where({ critic_id: criticId }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function list(movie_id) {
  return knex("reviews")
    .where({ movie_id: movieId })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

async function read(review)
return knex("reviews")
.where({review_id: reviewId})
.first()

async function update(review){
  return knex('reviews')
  .where({review_id: review.review_id})
  .update(review, "*")
  .then(()=> read(review.review_id))
  .then(setCritic)
}

module.exports = { destroy, list, read, update };