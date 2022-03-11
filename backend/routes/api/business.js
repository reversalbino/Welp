const express = require('express');

const { Business, Picture } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    let businesses = await Business.findAll({
        include: {
            model: Picture
        }
    });
    // let pictures = await Picture.findAll();

    // let allInfo = [...businesses, ...pictures]

    return res.json({
        businesses
    });
});

router.post('/', async (req, res) => {
    const {
        ownerId,
        title,
        description,
        address,
        city,
        state,
        zipCode
    } = req.body;

    let newBusiness = await Business.create({
        ownerId,
        title,
        description,
        address,
        city,
        state,
        zipCode
    });

    let newBusinessPicture = await Picture.create({
        businessId: newBusiness.id
    });

    let returnedBusiness = await Business.findOne({
        where: {
            id: newBusiness.id
        },
        include: {
            model: Picture
        }
    });

    res.json({
        returnedBusiness
    });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const picturesToDelete = await Picture.findAll({
        where: {
            businessId: id
        }
    });

    picturesToDelete.forEach(async picture => {
        await picture.destroy();
    });

    let businessToDelete = await Business.findByPk(id);
    await businessToDelete.destroy();

    return res.json({
        deleted: true,
        deletedBusinessId: id
    })
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
