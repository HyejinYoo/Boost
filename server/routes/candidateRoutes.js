const express = require('express');
const db = require('../db');
const router = express.Router();

// 지역별 후보 목록 조회
router.get('/:region', async (req, res) => {
    const { region } = req.params;
  
    try {
      // 특정 지역의 후보 정보 조회
      const [candidates] = await db.execute(
        `
        SELECT 
          c.id AS candidate_id, 
          u.username AS candidate_name 
        FROM 
          candidates c
        JOIN 
          users u 
        ON 
          c.user_id = u.id
        WHERE 
          u.region = ?;
        `,
        [region]
      );
  
      console.log(candidates);
      
      if (candidates.length === 0) {
        return res.status(404).json({ message: '해당 지역의 후보가 없습니다.' });
      }
  
      res.json({ candidates });
    } catch (error) {
      res.status(500).json({ message: '후보 조회 실패', error });
    }
  });

// 후보 등록
router.post('/', async (req, res) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ message: '로그인 필요' });
  }

  try {
    const [userRows] = await db.execute('SELECT region FROM users WHERE id = ?', [userId]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
    }

    const [candidateExists] = await db.execute('SELECT * FROM candidates WHERE user_id = ?', [userId]);

    if (candidateExists.length > 0) {
      return res.status(400).json({ message: '이미 후보로 등록되었습니다.' });
    }

    await db.execute('INSERT INTO candidates (user_id) VALUES (?)', [userId]);
    res.status(201).json({ message: '후보 등록 성공' });
  } catch (error) {
    res.status(500).json({ message: '후보 등록 실패', error });
  }
});

module.exports = router;