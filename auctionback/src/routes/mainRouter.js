import express from 'express'
import { addBid, auctionById, auctions, bid, createAuction, getBids } from '../controller/auctionController.js';
import { refresh } from '../controller/tokenController.js';
import { login, logout, register, users } from '../controller/userController.js';

import { auth } from '../middleware/auth.js';
import { auctionCreateValidation, registerValidator } from '../utils/validation.js';

export const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/users', auth, users);

router.get('/refresh', refresh);

router.post('/auctions/create', auth, auctionCreateValidation, createAuction);
router.get('/auctions', auth, auctions);
router.get('/auctions/:id', auth, auctionById);
router.post('/auctions/:id', auth, bid);

router.get('/bids/:id', auth, getBids);
router.post('/bids/:id', auth, addBid);
