const express = require('express');

const { Review } = require('../../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let reviewsForBusiness = await Review.findAll({
        where: {
            businessId: id
        }
    });

    console.log('router.get ~ reviewsForBusiness', reviewsForBusiness);

    return res.json({
        reviewsForBusiness
    });
});

router.post('/', async (req, res) => {
    const {
        userId,
        businessId,
        answer,
    } = req.body;

    let newReview = await Review.create({
        userId: userId,
        businessId: businessId,
        answer: answer
    });

    res.json({
        newReview
    });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const reviewToDelete = await Review.findByPk(id);

    await reviewToDelete.destroy();

    return res.json({
        deleted: true,
        deletedReviewId: id
    });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { newTitle, newDescription, newAddress, newCity, newState, newZipCode } = req.body;

    let businessToUpdate = await Business.findByPk(id);

    businessToUpdate.set({
        title: newTitle,
        description: newDescription,
        address: newAddress,
        city: newCity,
        state: newState,
        zipCode: newZipCode
    });

    await businessToUpdate.save();

    const updatedBusiness = await Business.findOne({
        where: {
            id
        },
        include: {
            model: Picture
        }
    });

    return res.json({
        updatedBusiness,
        id
    });
});

module.exports = router;
