const express = require('express');
const db = require('../db');
const router = express.Router();


router.get('/me', async (req, res) => {
    const userId = req.cookies.userId;
  
    if (!userId) {
      return res.status(401).json({ message: '로그인 필요' });
    }
  
    try {
      const [userRows] = await db.execute('SELECT id, username, region FROM users WHERE id = ?', [userId]);
  
      if (userRows.length === 0) {
        return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
      }
  
      res.json(userRows[0]);
    } catch (error) {
      res.status(500).json({ message: '사용자 정보 조회 실패', error });
    }
  });



// 사용자 정보 조회
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.execute('SELECT id, username, region FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: '사용자 정보 조회 실패', error });
  }
});

module.exports = router;