import React, { useState } from 'react';

const CandidateList = ({ candidates, region }) => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleCheckboxChange = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId) 
        : [...prev, candidateId] 
    );
  };

  return (
    <div>
      <h2>{region} 후보자</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.candidate_id}>
            <label>
              <input
                type="checkbox"
                value={candidate.candidate_id}
                checked={selectedCandidates.includes(candidate.candidate_id)} 
                onChange={() => handleCheckboxChange(candidate.candidate_id)} 
              />
              {candidate.candidate_name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;