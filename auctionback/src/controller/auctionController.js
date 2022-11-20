import auctionModel from '../model/auctionModel.js'

import { validationResult } from 'express-validator'

export const auctions = async (req, res) => {
  try {
    const auctions = await auctionModel.find()

    if (!auctions) {
      res.status(400).json({
        msg: 'Nothing found.'
      })
    }

    res.status(200).json(auctions)

  } catch (error) {
    console.log(error);
  }
};

export const getBids = async (req, res) => {
  try {
    const auction = await auctionModel.findById(req.params.id)
    if (!auction) {
      res.status(400).json({
        msg: 'Nothing found.'
      })
    }

    res.status(200).json(auction.bids)
  } catch (error) {
    console.log(error)
  }
}

export const addBid = async (req, res) => {
  console.log('bid: ', req.body)
  try {
    const auction = await auctionModel.updateOne({
      _id: req.params.id
    },
      {
        $addToSet: { bids: req.body }
      })
    if (!auction) {
      res.status(400).json({
        msg: 'Nothing found.'
      })
    }

    res.status(200).json({ msg: 'Bid ok' })
  } catch (error) {
    console.log(error)
  }
}

export const bid = async (req, res) => {
  try {
    const id = req.params.id
    await auctionModel.updateOne({
      _id: id
    },
      {
        $inc: { bids: 1 }
      })
    res.json({
      success: true
    })
  } catch (error) {
    console.log(err)
    res.status(500).json({
      msg: 'something wrong in update'
    })
  }
}

export const auctionById = async (req, res) => {

  try {
    const auction = await auctionModel.findById(req.params.id)
    if (!auction) {
      res.status(400).json({
        msg: 'Nothing found.'
      })
    }

    res.status(200).json(auction)
  } catch (error) {
    console.log(error);
  }
};

export const createAuction = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const { image, title, time, startPrice } = req.body
    const isExist = await auctionModel.findOne({ title })
    if (isExist) {
      return res.status(409).send('auction with that name exists')
    }

    const result = await auctionModel.create({ image, title, time, startPrice, user: req.userId })

    res.status(201).json(
      { result }
    )
  } catch (error) {
    console.log(error)
  }
}