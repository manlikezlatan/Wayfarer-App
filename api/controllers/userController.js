import moment from 'moment';
import db from '../models/db';
import Helper from '../services/helper';
import Validation from '../services/validation'


const createUser = async (req, res) => {
  const {
    email, first_name, last_name, password,
  } = req.body;

  /**
   * Create A User
   * @param {object} req  
   * @param {object} res
   * @returns {object} reflection object 
   */

    if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) {
      return res.status(400).send({
        'status': 'error',
        'error': 'Email, password, first name and last name field cannot be empty'
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        'status': 'error',
        'error': 'Please enter a valid email address'
      });
    }
    if (!Helper.validatePassword(password)) {
      return res.status(400).send({
        'status': 'error',
        'error': 'Password must be more than eight(8) characters'
      });
    }
    const created_on = moment(new Date());
    const hashedPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      email,
      first_name,
      last_name,
      hashedPassword,
      created_on,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 
          'status': 'error',
          'error': 'User with that EMAIL already exist' 
        });
      }
      return res.status(400).send(error);
    }
  }

export default createUser;