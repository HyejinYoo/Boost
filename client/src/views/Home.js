import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CandidateList from './CandidateList';
import '../styles/Home.css';

const Home = ({ user }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/candidates/${user.region}`);
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    if (user?.region) {
      fetchCandidates();
    }
  }, [user]);

  const registerCandidate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/candidates',
        {},
        { withCredentials: true }
      );
      setMessage(response.data.message);
      const refreshResponse = await axios.get(`http://localhost:3001/candidates/${user.region}`);
      setCandidates(refreshResponse.data.candidates);
    } catch (error) {
      setMessage('Error registering candidate.');
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      setMessage('Please select a candidate to vote for.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3001/vote`,
        { candidateId: selectedCandidate },
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error voting for candidate.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="content">
        <CandidateList
          candidates={candidates}
          region={user.region} // 지역 정보를 전달
          selectedCandidate={selectedCandidate}
          onCandidateSelect={setSelectedCandidate}
        />
        <p>{message}</p>
        <button className="vote-btn" onClick={handleVote}>Vote</button>
      </div>
      <button className="register-btn" onClick={registerCandidate}>Register as Candidate</button>
    </div>
  );
};

export default Home;