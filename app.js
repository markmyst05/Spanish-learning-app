import React, { useState, useEffect } from 'react';
import { Volume2, RefreshCw, Star, Trophy, MessageCircle, BookOpen, Mic, Shuffle, CheckCircle, XCircle } from 'lucide-react';

const SpanishLearningApp = () => {
  const [currentActivity, setCurrentActivity] = useState('home');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState(new Set());
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [audioSupported, setAudioSupported] = useState(false);

  useEffect(() => {
    setAudioSupported('speechSynthesis' in window);
  }, []);

  const scenarios = [
    {
      id: 1,
      title: "En el Café",
      icon: "☕",
      difficulty: "Beginner",
      phrases: [
        { spanish: "¡Hola! ¿Qué tal?", english: "Hello! How are you?", pronunciation: "OH-lah keh tahl" },
        { spanish: "Un café con leche, por favor", english: "A coffee with milk, please", pronunciation: "oon kah-FEH kon LEH-cheh por fah-VOR" },
        { spanish: "¿Cuánto cuesta?", english: "How much does it cost?", pronunciation: "KWAN-toh KWES-tah" },
        { spanish: "Muchas gracias", english: "Thank you very much", pronunciation: "MOO-chahs GRAH-see-ahs" },
        { spanish: "¿Tiene WiFi?", english: "Do you have WiFi?", pronunciation: "tee-EH-neh WEE-fee" }
      ]
    },
    {
      id: 2,
      title: "Presentándose",
      icon: "👋",
      difficulty: "Beginner",
      phrases: [
        { spanish: "Me llamo María", english: "My name is María", pronunciation: "meh YAH-moh mah-REE-ah" },
        { spanish: "Soy de Estados Unidos", english: "I'm from the United States", pronunciation: "soy deh es-TAH-dohs oo-NEE-dohs" },
        { spanish: "Tengo veinticinco años", english: "I am twenty-five years old", pronunciation: "TEN-goh vayn-tee-SEEN-koh AH-nyohs" },
        { spanish: "Mucho gusto", english: "Nice to meet you", pronunciation: "MOO-choh GOOS-toh" },
        { spanish: "¿De dónde eres?", english: "Where are you from?", pronunciation: "deh DOHN-deh EH-rehs" }
      ]
    },
    {
      id: 3,
      title: "En el Restaurante",
      icon: "🍽️",
      difficulty: "Intermediate",
      phrases: [
        { spanish: "¿Podría ver el menú?", english: "Could I see the menu?", pronunciation: "poh-DREE-ah vehr el meh-NOO" },
        { spanish: "¿Qué me recomienda?", english: "What do you recommend?", pronunciation: "keh meh reh-koh-MYEN-dah" },
        { spanish: "Para mí, la paella", english: "For me, the paella", pronunciation: "PAH-rah mee lah pah-EH-yah" },
        { spanish: "La cuenta, por favor", english: "The check, please", pronunciation: "lah KWEN-tah por fah-VOR" },
        { spanish: "¿Está incluida la propina?", english: "Is the tip included?", pronunciation: "es-TAH in-kloo-EE-dah lah proh-PEE-nah" }
      ]
    },
    {
      id: 4,
      title: "En el Hotel",
      icon: "🏨",
      difficulty: "Intermediate",
      phrases: [
        { spanish: "Tengo una reservación", english: "I have a reservation", pronunciation: "TEN-goh OO-nah reh-sehr-vah-see-OHN" },
        { spanish: "¿A qué hora es el desayuno?", english: "What time is breakfast?", pronunciation: "ah keh OH-rah ehs el deh-sah-YOO-noh" },
        { spanish: "¿Dónde está el ascensor?", english: "Where is the elevator?", pronunciation: "DOHN-deh es-TAH el ah-sen-SOHR" },
        { spanish: "Necesito toallas limpias", english: "I need clean towels", pronunciation: "neh-seh-SEE-toh toh-AH-yahs LEEM-pee-ahs" },
        { spanish: "¿Hay servicio de habitación?", english: "Is there room service?", pronunciation: "eye sehr-VEE-see-oh deh ah-bee-tah-see-OHN" }
      ]
    },
    {
      id: 5,
      title: "Pidiendo Direcciones",
      icon: "🗺️",
      difficulty: "Intermediate",
      phrases: [
        { spanish: "Disculpe, ¿dónde está...?", english: "Excuse me, where is...?", pronunciation: "dees-KOOL-peh DOHN-deh es-TAH" },
        { spanish: "¿Cómo llego al centro?", english: "How do I get to downtown?", pronunciation: "KOH-moh YEH-goh al SEN-troh" },
        { spanish: "¿Está muy lejos?", english: "Is it very far?", pronunciation: "es-TAH moo-ee LEH-hohs" },
        { spanish: "Siga derecho", english: "Go straight", pronunciation: "SEE-gah deh-REH-choh" },
        { spanish: "Doble a la izquierda", english: "Turn left", pronunciation: "DOH-bleh ah lah ees-kee-EHR-dah" }
      ]
    },
    {
      id: 6,
      title: "De Compras",
      icon: "🛍️",
      difficulty: "Beginner",
      phrases: [
        { spanish: "¿Cuánto vale esto?", english: "How much is this?", pronunciation: "KWAN-toh VAH-leh EHS-toh" },
        { spanish: "¿Tienen en otra talla?", english: "Do you have it in another size?", pronunciation: "tee-EH-nen en OH-trah TAH-yah" },
        { spanish: "Me gusta mucho", english: "I like it a lot", pronunciation: "meh GOOS-tah MOO-choh" },
        { spanish: "¿Puedo probármelo?", english: "Can I try it on?", pronunciation: "PWEH-doh proh-BAHR-meh-loh" },
        { spanish: "Lo compro", english: "I'll buy it", pronunciation: "loh KOHM-proh" }
      ]
    },
    {
      id: 7,
      title: "En el Trabajo",
      icon: "💼",
      difficulty: "Intermediate",
      phrases: [
        { spanish: "Me gustaría programar una reunión", english: "I would like to schedule a meeting", pronunciation: "meh goos-tah-REE-ah proh-grah-MAHR OO-nah reh-oo-nee-OHN" },
        { spanish: "¿Podríamos discutir el proyecto?", english: "Could we discuss the project?", pronunciation: "poh-DREE-ah-mohs dees-koo-TEER el proh-YEK-toh" },
        { spanish: "Necesito enviar este informe", english: "I need to send this report", pronunciation: "neh-seh-SEE-toh en-vee-AHR EHS-teh in-FOR-meh" },
        { spanish: "¿Cuál es la fecha límite?", english: "What is the deadline?", pronunciation: "kwahl ehs lah FEH-chah LEE-mee-teh" },
        { spanish: "Trabajemos juntos en esto", english: "Let's work together on this", pronunciation: "trah-bah-HEH-mohs HOON-tohs en EHS-toh" }
      ]
    },
    {
      id: 8,
      title: "En el Médico",
      icon: "🏥",
      difficulty: "Intermediate",
      phrases: [
        { spanish: "Me duele mucho la cabeza", english: "My head hurts a lot", pronunciation: "meh DWEH-leh MOO-choh lah kah-BEH-sah" },
        { spanish: "¿Desde cuándo tiene estos síntomas?", english: "Since when have you had these symptoms?", pronunciation: "DEHS-deh KWAN-doh tee-EH-neh EHS-tohs SEEN-toh-mahs" },
        { spanish: "Tomo medicamentos para la presión", english: "I take medication for blood pressure", pronunciation: "TOH-moh meh-dee-kah-MEN-tohs PAH-rah lah preh-see-OHN" },
        { spanish: "¿Necesito hacer análisis de sangre?", english: "Do I need to do blood tests?", pronunciation: "neh-seh-SEE-toh ah-SEHR ah-NAH-lee-sees deh SAHN-greh" },
        { spanish: "Regrese en dos semanas", english: "Come back in two weeks", pronunciation: "reh-GREH-seh en dohs seh-MAH-nahs" }
      ]
    },
    {
      id: 9,
      title: "Negociando Precios",
      icon: "💰",
      difficulty: "Advanced",
      phrases: [
        { spanish: "¿Sería posible conseguir un descuento?", english: "Would it be possible to get a discount?", pronunciation: "seh-REE-ah poh-SEE-bleh kon-seh-GEER oon dehs-KWEN-toh" },
        { spanish: "El precio me parece un poco elevado", english: "The price seems a bit high to me", pronunciation: "el PREH-see-oh meh pah-REH-seh oon POH-koh eh-leh-VAH-doh" },
        { spanish: "¿Qué tal si dividimos la diferencia?", english: "How about we split the difference?", pronunciation: "keh tahl see dee-vee-DEE-mohs lah dee-feh-REN-see-ah" },
        { spanish: "Necesito consultar con mi jefe", english: "I need to consult with my boss", pronunciation: "neh-seh-SEE-toh kon-sool-TAHR kon mee HEH-feh" },
        { spanish: "¿Cuál sería su mejor oferta?", english: "What would be your best offer?", pronunciation: "kwahl seh-REE-ah soo meh-HOHR oh-FEHR-tah" }
      ]
    },
    {
      id: 10,
      title: "Conversación Profunda",
      icon: "🧠",
      difficulty: "Advanced",
      phrases: [
        { spanish: "¿Qué opinas sobre la situación actual?", english: "What do you think about the current situation?", pronunciation: "keh oh-PEE-nahs SOH-breh lah see-too-ah-see-OHN ak-too-AHL" },
        { spanish: "Desde mi punto de vista, creo que...", english: "From my point of view, I think that...", pronunciation: "DEHS-deh mee POON-toh deh VEES-tah KREH-oh keh" },
        { spanish: "Es un tema bastante complejo", english: "It's a quite complex topic", pronunciation: "ehs oon TEH-mah bahs-TAHN-teh kom-PLEH-hoh" },
        { spanish: "Me gustaría escuchar tu perspectiva", english: "I would like to hear your perspective", pronunciation: "meh goos-tah-REE-ah es-koo-CHAHR too pehr-spek-TEE-vah" },
        { spanish: "Hay varios factores a considerar", english: "There are several factors to consider", pronunciation: "eye VAH-ree-ohs fak-TOH-rehs ah kon-see-deh-RAHR" }
      ]
    },
    {
      id: 11,
      title: "Expresando Emociones",
      icon: "💭",
      difficulty: "Intermediate",
      phrases: [
        { spanish: "Me siento muy emocionado por esto", english: "I feel very excited about this", pronunciation: "meh see-EN-toh moo-ee eh-moh-see-oh-NAH-doh por EHS-toh" },
        { spanish: "Estoy un poco preocupado", english: "I'm a little worried", pronunciation: "es-TOY oon POH-koh preh-oh-koo-PAH-doh" },
        { spanish: "Eso me hace sentir orgulloso", english: "That makes me feel proud", pronunciation: "EH-soh meh AH-seh sen-TEER or-goo-YOH-soh" },
        { spanish: "No puedo evitar sentirme nervioso", english: "I can't help feeling nervous", pronunciation: "noh PWEH-doh eh-vee-TAHR sen-TEER-meh nehr-vee-OH-soh" },
        { spanish: "Me alegra mucho saber eso", english: "I'm very happy to know that", pronunciation: "meh ah-LEH-grah MOO-choh sah-BEHR EH-soh" }
      ]
    },
    {
      id: 12,
      title: "Planificando Eventos",
      icon: "🎉",
      difficulty: "Advanced",
      phrases: [
        { spanish: "¿Te parece bien si organizamos la fiesta el sábado?", english: "Does it seem okay if we organize the party on Saturday?", pronunciation: "teh pah-REH-seh bee-EN see or-gah-nee-SAH-mohs lah fee-EHS-tah el SAH-bah-doh" },
        { spanish: "Tendríamos que hacer las reservaciones pronto", english: "We would have to make reservations soon", pronunciation: "ten-DREE-ah-mohs keh ah-SEHR lahs reh-sehr-vah-see-OH-nehs PRON-toh" },
        { spanish: "¿Cuántas personas crees que vendrán?", english: "How many people do you think will come?", pronunciation: "KWAN-tahs pehr-SOH-nahs KREH-ehs keh ven-DRAHN" },
        { spanish: "Necesitamos coordinar la música y la comida", english: "We need to coordinate the music and food", pronunciation: "neh-seh-see-TAH-mohs koh-or-dee-NAHR lah MOO-see-kah ee lah koh-MEE-dah" },
        { spanish: "Si todo sale bien, será increíble", english: "If everything goes well, it will be incredible", pronunciation: "see TOH-doh SAH-leh bee-EN seh-RAH in-kreh-EE-bleh" }
      ]
    }
  ];

  const quizQuestions = [
    {
      question: "How do you say 'Thank you very much' in Spanish?",
      options: ["Muchas gracias", "De nada", "Por favor", "Disculpe"],
      correct: 0
    },
    {
      question: "What does '¿Cuánto cuesta?' mean?",
      options: ["What time is it?", "How much does it cost?", "Where is it?", "What is your name?"],
      correct: 1
    },
    {
      question: "How do you ask 'Where is the bathroom?' in Spanish?",
      options: ["¿Dónde está el baño?", "¿Cómo está usted?", "¿Qué hora es?", "¿Cuál es su nombre?"],
      correct: 0
    },
    {
      question: "What does 'Me llamo' mean?",
      options: ["I am from", "I live in", "My name is", "I am"],
      correct: 2
    },
    {
      question: "How do you say 'Excuse me' in Spanish?",
      options: ["Por favor", "Gracias", "Disculpe", "Adiós"],
      correct: 2
    },
    {
      question: "What does 'Desde mi punto de vista' mean?",
      options: ["From my house", "Since yesterday", "From my point of view", "Since my birthday"],
      correct: 2
    },
    {
      question: "How do you say 'I would like to schedule a meeting' in Spanish?",
      options: ["Me gusta la reunión", "Me gustaría programar una reunión", "Tengo una reunión", "Voy a la reunión"],
      correct: 1
    },
    {
      question: "What does '¿Sería posible conseguir un descuento?' mean?",
      options: ["Is it possible to get a discount?", "Would it be possible to get a discount?", "I want a discount", "Do you have discounts?"],
      correct: 1
    },
    {
      question: "How do you express 'I feel very excited' in Spanish?",
      options: ["Estoy muy cansado", "Me siento muy emocionado", "Tengo mucha hambre", "Estoy muy ocupado"],
      correct: 1
    },
    {
      question: "What does 'Hay varios factores a considerar' mean?",
      options: ["There are many problems", "There are several factors to consider", "There are various solutions", "There are different options"],
      correct: 1
    }
  ];

  const encouragements = [
    "¡Excelente! 🌟",
    "¡Muy bien! 👏",
    "¡Perfecto! ⭐",
    "¡Increíble! 🎉",
    "¡Fantástico! 🚀",
    "¡Bravo! 🎊",
    "¡Magnífico! ✨"
  ];

  const playAudio = (text) => {
    if (audioSupported && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.7;
      utterance.pitch = 1;
      
      // Try to get a Spanish voice
      const voices = speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const handlePhraseComplete = () => {
    setCompletedPhrases(prev => new Set([...prev, `${selectedScenario.id}-${currentPhrase}`]));
    setScore(prev => prev + 10);
    setStreak(prev => prev + 1);
    
    if (currentPhrase < selectedScenario.phrases.length - 1) {
      setTimeout(() => {
        setCurrentPhrase(prev => prev + 1);
        setShowTranslation(false);
      }, 1500);
    }
  };

  const resetScenario = () => {
    setCurrentPhrase(0);
    setShowTranslation(false);
    setCompletedPhrases(new Set());
  };

  const startQuiz = () => {
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    setCurrentQuiz(randomQuestion);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setCurrentActivity('quiz');
  };

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);
    
    if (answerIndex === currentQuiz.correct) {
      setScore(prev => prev + 20);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const ActivitySelector = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
          ¡Hola! Spanish Practice
        </h1>
        <p className="text-gray-600 text-lg">Build confidence through fun activities</p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-1 text-orange-500">
            <Trophy size={20} />
            <span className="font-semibold">{score} points</span>
          </div>
          <div className="flex items-center gap-1 text-purple-500">
            <Star size={20} />
            <span className="font-semibold">{streak} streak</span>
          </div>
        </div>
      </div>

      {!audioSupported && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-yellow-800">
            🔊 Audio not available in preview mode, but will work when you use this code in a browser!
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-8 text-center"
          onClick={() => setCurrentActivity('scenarios')}
        >
          <MessageCircle size={48} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Conversation Practice</h3>
          <p className="text-blue-100">Practice real-world scenarios</p>
        </div>
        
        <div
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-8 text-center"
          onClick={startQuiz}
        >
          <BookOpen size={48} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Quick Quiz</h3>
          <p className="text-green-100">Test your knowledge</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">💡 Speaking Confidence Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-purple-700">
          <div>• Start with simple phrases and build up</div>
          <div>• Practice pronunciation slowly first</div>
          <div>• Use hand gestures while speaking</div>
          <div>• Record yourself to hear progress</div>
          <div>• Don't worry about perfect accent</div>
          <div>• Celebrate small victories!</div>
        </div>
      </div>
    </div>
  );

  const ScenarioSelector = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentActivity('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back to activities
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Choose Your Scenario</h2>
        <div></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => {
              setSelectedScenario(scenario);
              resetScenario();
            }}
          >
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">{scenario.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{scenario.title}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : 
                scenario.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {scenario.difficulty}
              </span>
              <p className="text-gray-600 mt-3">{scenario.phrases.length} phrases to practice</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PracticeSession = () => {
    const phrase = selectedScenario.phrases[currentPhrase];
    const isCompleted = completedPhrases.has(`${selectedScenario.id}-${currentPhrase}`);
    
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedScenario(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to scenarios
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {currentPhrase + 1} / {selectedScenario.phrases.length}
            </div>
            <button
              onClick={resetScenario}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedScenario.title}</h2>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentPhrase + 1) / selectedScenario.phrases.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-orange-600 mb-4" style={{fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.02em'}}>
              {phrase.spanish}
            </div>
            <button
              onClick={() => playAudio(phrase.spanish)}
              className="flex items-center gap-2 mx-auto bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-full transition-colors"
              disabled={!audioSupported}
            >
              <Volume2 size={20} />
              {audioSupported ? 'Listen' : 'Audio (Browser Only)'}
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="text-lg text-gray-600 mb-2 font-mono bg-gray-50 rounded-lg p-3">
              [{phrase.pronunciation}]
            </div>
            <p className="text-sm text-gray-500 italic">Pronunciation guide</p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              {showTranslation ? 'Hide Translation' : 'Show Translation'}
            </button>
            {showTranslation && (
              <div className="mt-4 text-xl text-gray-700 font-medium bg-blue-50 rounded-lg p-4">
                "{phrase.english}"
              </div>
            )}
          </div>

          {!isCompleted ? (
            <div className="text-center">
              <div className="bg-yellow-50 rounded-xl p-6 mb-6 border border-yellow-200">
                <Mic className="mx-auto mb-3 text-yellow-600" size={32} />
                <p className="text-yellow-800 font-medium mb-2">Practice Time!</p>
                <p className="text-yellow-700 text-sm">
                  Say this phrase out loud 3 times with confidence, then click "I practiced it!"
                </p>
              </div>
              <button
                onClick={handlePhraseComplete}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                I practiced it! ✨
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 rounded-xl p-6 mb-4 border border-green-200">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {encouragements[Math.floor(Math.random() * encouragements.length)]}
                </div>
                <p className="text-green-700">You've mastered this phrase!</p>
              </div>
              {currentPhrase < selectedScenario.phrases.length - 1 && (
                <p className="text-gray-600">Moving to next phrase...</p>
              )}
              {currentPhrase === selectedScenario.phrases.length - 1 && (
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <Trophy className="mx-auto mb-3 text-purple-600" size={32} />
                  <p className="text-purple-800 font-bold text-xl">¡Scenario Completado!</p>
                  <p className="text-purple-700 mt-2">You've practiced all phrases in this scenario!</p>
                  <button
                    onClick={() => setCurrentActivity('scenarios')}
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors"
                  >
                    Try Another Scenario
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const QuizSession = () => (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentActivity('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back to activities
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Quick Quiz</h2>
        <div></div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuiz.question}
          </div>
          
          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showQuizResult && handleQuizAnswer(index)}
                disabled={showQuizResult}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  showQuizResult
                    ? index === currentQuiz.correct
                      ? 'bg-green-100 border-2 border-green-400 text-green-800'
                      : index === selectedAnswer && index !== currentQuiz.correct
                      ? 'bg-red-100 border-2 border-red-400 text-red-800'
                      : 'bg-gray-100 text-gray-600'
                    : selectedAnswer === index
                    ? 'bg-blue-100 border-2 border-blue-400'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                    {option}
                  </span>
                  {showQuizResult && index === currentQuiz.correct && <CheckCircle size={20} className="text-green-600" />}
                  {showQuizResult && index === selectedAnswer && index !== currentQuiz.correct && <XCircle size={20} className="text-red-600" />}
                </div>
              </button>
            ))}
          </div>

          {showQuizResult && (
            <div className="mt-8">
              {selectedAnswer === currentQuiz.correct ? (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">¡Correcto!</div>
                  <p className="text-green-700">+20 points!</p>
                </div>
              ) : (
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-2xl font-bold text-red-600 mb-2">Keep Learning!</div>
                  <p className="text-red-700">The correct answer was: <strong>{currentQuiz.options[currentQuiz.correct]}</strong></p>
                </div>
              )}
              
              <div className="flex gap-4 mt-6 justify-center">
                <button
                  onClick={startQuiz}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Next Question
                </button>
                <button
                  onClick={() => setCurrentActivity('home')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      {currentActivity === 'home' && <ActivitySelector />}
      {currentActivity === 'scenarios' && !selectedScenario && <ScenarioSelector />}
      {selectedScenario && <PracticeSession />}
      {currentActivity === 'quiz' && <QuizSession />}
    </div>
  );
};

export default SpanishLearningApp;