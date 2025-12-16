import React, { useState } from 'react';
import { CheckCircle, Circle, Trophy, Clock, MapPin } from 'lucide-react';

const ScavengerHunt = () => {
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState({});
  const [showHints, setShowHints] = useState({});

  const challenges = [
    {
      id: 1,
      category: "Getting Started",
      title: "Discover CFR's Mission",
      description: "Navigate to the 'About' section and find when CFR was founded.",
      hint: "Look for the About page in the main navigation",
      answer: "1921",
      points: 10,
      url: "https://www.cfr.org/about"
    },
    {
      id: 2,
      category: "Publications",
      title: "Find Foreign Affairs",
      description: "Locate CFR's flagship publication. What is it called?",
      hint: "Check the main navigation or look for publications",
      answer: "foreign affairs",
      points: 10,
      url: "https://www.cfr.org"
    },
    {
      id: 3,
      category: "Content Exploration",
      title: "Current Events",
      description: "Find an article or analysis about a current global issue. What region or topic did you choose?",
      hint: "Look for sections like 'Regions', 'Topics', or recent articles on the homepage",
      answer: "open", // Open-ended
      points: 15,
      url: "https://www.cfr.org"
    },
    {
      id: 4,
      category: "Experts",
      title: "Meet the Experts",
      description: "Find the 'Experts' section. How many different expertise areas can you identify?",
      hint: "Look for a section dedicated to CFR fellows and scholars",
      answer: "open",
      points: 15,
      url: "https://www.cfr.org/experts"
    },
    {
      id: 5,
      category: "Multimedia",
      title: "Video Content",
      description: "Find a video event or interview. What's the title?",
      hint: "Look for Events, Videos, or Multimedia sections",
      answer: "open",
      points: 15,
      url: "https://www.cfr.org"
    },
    {
      id: 6,
      category: "Deep Dive",
      title: "Topic Pages",
      description: "Navigate to a topic page (like China, Climate, or Middle East). What helpful features do you notice?",
      hint: "Topic pages aggregate content by subject",
      answer: "open",
      points: 20,
      url: "https://www.cfr.org"
    },
    {
      id: 7,
      category: "Search & Discovery",
      title: "Use the Search",
      description: "Use the site's search feature to find content on a topic you're interested in. What did you search for?",
      hint: "Look for a search icon or bar in the navigation",
      answer: "open",
      points: 15,
      url: "https://www.cfr.org"
    }
  ];

  const handleAnswerChange = (challengeId, value) => {
    setAnswers({
      ...answers,
      [challengeId]: value
    });
  };

  const checkAnswer = (challenge) => {
    const userAnswer = answers[challenge.id]?.toLowerCase().trim();
    
    if (challenge.answer === "open") {
      // For open-ended questions, just check if something was entered
      return userAnswer && userAnswer.length > 0;
    }
    
    return userAnswer === challenge.answer.toLowerCase();
  };

  const submitAnswer = (challenge) => {
    if (checkAnswer(challenge)) {
      setCompletedChallenges({
        ...completedChallenges,
        [challenge.id]: true
      });
      setAnswers({
        ...answers,
        [challenge.id]: ''
      });
    }
  };

  const toggleHint = (challengeId) => {
    setShowHints({
      ...showHints,
      [challengeId]: !showHints[challengeId]
    });
  };

  const totalPoints = challenges.reduce((sum, c) => 
    completedChallenges[c.id] ? sum + c.points : sum, 0
  );
  
  const maxPoints = challenges.reduce((sum, c) => sum + c.points, 0);
  const completedCount = Object.keys(completedChallenges).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-indigo-900">CFR.org Scavenger Hunt</h1>
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
          <p className="text-gray-600 mb-4">
            Explore the Council on Foreign Relations website and complete challenges to learn about this premier foreign policy resource!
          </p>
          
          {/* Score Panel */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-indigo-50 rounded p-3 text-center">
              <div className="text-2xl font-bold text-indigo-600">{completedCount}/{challenges.length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-green-50 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{totalPoints}/{maxPoints}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="bg-purple-50 rounded p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((totalPoints / maxPoints) * 100) || 0}%
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <h3 className="font-bold text-blue-900 mb-2">How to Play:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Click on the CFR.org link for each challenge to visit the website</li>
            <li>Complete the challenge by finding the information requested</li>
            <li>Enter your answer in the input field</li>
            <li>Click "Submit" to check your answer and earn points</li>
            <li>Complete all challenges to become a CFR.org expert!</li>
          </ol>
        </div>

        {/* Challenges */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const isCompleted = completedChallenges[challenge.id];
            
            return (
              <div 
                key={challenge.id}
                className={`bg-white rounded-lg shadow-md p-5 transition-all ${
                  isCompleted ? 'border-2 border-green-400' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded mb-2">
                          {challenge.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-indigo-600">
                          {challenge.points} pts
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3 text-lg">{challenge.description}</p>
                    
                    {!isCompleted && (
                      <>
                        <button
                          onClick={() => toggleHint(challenge.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 underline"
                        >
                          {showHints[challenge.id] ? '− Hide hint' : '+ Show hint'}
                        </button>
                        
                        {showHints[challenge.id] && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3 text-sm text-yellow-800">
                            <strong>Hint:</strong> {challenge.hint}
                          </div>
                        )}
                        
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            value={answers[challenge.id] || ''}
                            onChange={(e) => handleAnswerChange(challenge.id, e.target.value)}
                            placeholder="Enter your answer..."
                            className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                submitAnswer(challenge);
                              }
                            }}
                          />
                          <button
                            onClick={() => submitAnswer(challenge)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                        
                        <a
                          href={challenge.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <MapPin className="w-4 h-4" />
                          Visit CFR.org to find the answer
                        </a>
                      </>
                    )}
                    
                    {isCompleted && (
                      <div className="bg-green-50 border border-green-200 rounded p-3 text-green-800">
                        <strong>✓ Challenge completed!</strong> Great work exploring this section of CFR.org.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedCount === challenges.length && (
          <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-6 text-white text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl">
              You've completed the CFR.org scavenger hunt and earned all {maxPoints} points!
            </p>
            <p className="mt-2">
              You're now familiar with the Council on Foreign Relations' website and ready to explore global affairs!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScavengerHunt;