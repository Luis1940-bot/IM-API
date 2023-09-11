const courier = require('express').Router();
const express = require('express');
const cors = require('cors');
const { Courier, CourierType } = require('../../db');

courier.use(express.json());
courier.use(cors());
courier.use(
  express.urlencoded({
    extended: true,
  }),
);

courier.post('/courier', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      document,
      address,
      cp,
      bank,
      account,
      detail,
      start,
      courierType,
    } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [courierCreated, created] = await Courier.findOrCreate({
      where: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      },
      defaults: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        document,
        address,
        cp,
        bank,
        account,
        detail,
        start,
        courierTypeId: courierType
          ? (
            await CourierType.findOne({ where: { type: courierType } })
          )?.id
          : null,
      },
    });
    if (created) {
      res.status(200).send('courier created');
    } else {
      res.status(422).send('Existing courier ');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

courier.get('/all', async (req, res) => {
  try {
    const cour = await Courier.findAll({
      attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'active'],
      include: [
        {
          model: CourierType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (cour.length > 0) {
      res.status(201).json(cour);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

courier.get('/all_active', async (req, res) => {
  try {
    const cour = await Courier.findAll({
      where: { active: true },
      attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'active'],
      include: [
        {
          model: CourierType,
          attributes: ['id', 'type', 'detail', 'active'],
        },
      ],
    });

    if (cour.length > 0) {
      res.status(201).json(cour);
    } else {
      res.status(422).json('Not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

courier.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Number.isInteger(parseInt(id, 10))) {
      const cour = await Courier.findAll({
        where: { id: parseInt(id, 10) },
        attributes: ['id', 'firstName', 'lastName', 'document', 'address', 'cp', 'bank', 'account', 'detail', 'start', 'active'],
        include: [
          {
            model: CourierType,
            attributes: ['id', 'type', 'detail', 'active'],
          },
        ],
      });
      if (cour.length > 0) {
        res.status(201).json(cour);
      } else {
        res.status(422).json('Not found');
      }
    } else {
      res.status(422).send('ID was not provided');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

courier.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      document,
      address,
      cp,
      bank,
      account,
      detail,
      start,
      courierType,
    } = req.body;
    const courierFinded = await Courier.findOne({
      where: { id },
    });
    if (courierFinded) {
      await courierFinded.update({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        document,
        address,
        cp,
        bank,
        account,
        detail,
        start,
        courierTypeId: courierType
          ? (
            await CourierType.findOne({ where: { type: courierType } })
          )?.id
          : null,
      });
      res.status(200).send('The data was modified successfully');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

courier.put('/active/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const courierFinded = await Courier.findOne({
      where: { id },
    });
    if (courierFinded) {
      await courierFinded.update({
        active: true,
      });
      res.status(200).send('Active');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

courier.put('/inactive/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const courierFinded = await Courier.findOne({
      where: { id },
    });
    if (courierFinded) {
      await courierFinded.update({
        active: false,
      });
      res.status(200).send('Inactive');
    } else {
      res.status(200).send('ID not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

courier.all('*', async (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

module.exports = courier;