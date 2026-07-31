"use client";

import { useState, useEffect } from "react";
import { Plus, Play, Pause, RotateCcw, Clock, LineChart as LineChartIcon, BookOpen, User, Trophy } from "lucide-react";
import { evaluate } from "mathjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";

function HomeContent() {
  return (
    <section className="max-w-3xl w-full flex flex-col items-center text-center space-y-8 py-20 px-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          나만의 교육용 웹앱 만들기
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          학생들을 위한 맞춤형 학습 도구를 쉽고 직관적으로 만들어보세요. 
          최고의 교육 환경은 선생님의 손끝에서 시작됩니다.
        </p>
      </div>

      <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-medium shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
        <Plus className="w-5 h-5" />
        <span>기능 추가하기</span>
      </button>
    </section>
  );
}

function TimerContent() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(300);
  };
  const setPreset = (seconds: number) => {
    setIsRunning(false);
    setTimeLeft(seconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="max-w-2xl w-full flex flex-col items-center text-center space-y-10 py-16 px-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60">
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 mb-4">
          <Clock className="w-5 h-5" />
          <span className="font-medium">타이머</span>
        </div>
        <div className="text-7xl md:text-8xl font-black text-slate-800 tracking-tighter font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={toggleTimer} className={`flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${isRunning ? 'bg-amber-500 shadow-amber-500/20 hover:bg-amber-600' : 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600'}`}>
          {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </button>
        <button onClick={resetTimer} className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-slate-600 shadow-sm border border-slate-100 transition-all hover:bg-slate-50 hover:scale-105 active:scale-95">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-200/50 w-full max-w-sm">
        {[1, 3, 5, 10, 15, 30].map((min) => (
          <button
            key={min}
            onClick={() => setPreset(min * 60)}
            className="px-4 py-2 rounded-full bg-white/60 text-slate-600 font-medium text-sm shadow-sm border border-white hover:bg-white transition-all"
          >
            {min}분
          </button>
        ))}
      </div>
    </section>
  );
}

function GraphContent() {
  const [expression, setExpression] = useState("sin(x)");
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const points = [];
      for (let x = -10; x <= 10; x += 0.5) {
        const y = evaluate(expression, { x });
        if (typeof y === "number" && !isNaN(y)) {
          if (y > 100 || y < -100) continue;
          points.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(3)) });
        }
      }
      if (points.length === 0) {
        setError("그래프를 그릴 수 없는 수식입니다.");
      } else {
        setData(points);
        setError("");
      }
    } catch (err) {
      setError("유효하지 않은 함수식입니다. (예: sin(x), x^2 + 2x)");
    }
  }, [expression]);

  return (
    <section className="max-w-4xl w-full flex flex-col items-center space-y-8 py-12 px-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
          <LineChartIcon className="w-5 h-5" />
          <span className="font-medium">그래프</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">함수 그래프 시각화</h2>
        <p className="text-slate-500">원하는 함수식을 입력하면 실시간으로 차트가 그려집니다.</p>
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-4">함수식 ( f(x) = )</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="예: sin(x) 또는 x^2 + 3"
            className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-700 text-lg font-mono text-center"
          />
          {error && <p className="text-red-500 text-sm ml-4 mt-1">{error}</p>}
        </div>
      </div>

      <div className="w-full h-[400px] bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-center">
        {data.length > 0 && !error ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="x" 
                stroke="#94a3b8" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                minTickGap={20}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(label) => `x: ${label}`}
                formatter={(value: any) => [`y: ${value}`, "Value"]}
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-slate-400 font-medium">그래프 영역</div>
        )}
      </div>
    </section>
  );
}

type Question = { a: number, b: number, operator: string, answer: number };

function QuizContent() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [studentName, setStudentName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const generateQuestions = () => {
    const newQuestions: Question[] = [];
    const ops = ['+', '-', '*'];
    for (let i = 0; i < 5; i++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      let a = Math.floor(Math.random() * 20) + 1;
      let b = Math.floor(Math.random() * 20) + 1;
      // Ensure no negative answers for simple quiz
      if (op === '-' && a < b) {
        const temp = a;
        a = b;
        b = temp;
      }
      let ans = 0;
      if (op === '+') ans = a + b;
      if (op === '-') ans = a - b;
      if (op === '*') ans = a * b;
      newQuestions.push({ a, b, operator: op, answer: ans });
    }
    setQuestions(newQuestions);
  };

  const startQuiz = () => {
    if (!studentName.trim()) return;
    generateQuestions();
    setCurrentIdx(0);
    setScore(0);
    setStep("quiz");
  };

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (data && !error) {
      setLeaderboard(data);
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer) return;

    let newScore = score;
    if (parseInt(userAnswer) === questions[currentIdx].answer) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserAnswer("");
    } else {
      setIsSaving(true);
      // Save result
      await supabase.from("quiz_results").insert({
        student_name: studentName,
        score: newScore,
        total_questions: questions.length
      });
      await fetchLeaderboard();
      setIsSaving(false);
      setStep("result");
    }
  };

  return (
    <section className="max-w-2xl w-full flex flex-col items-center py-12 px-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60 min-h-[500px]">
      
      {step === "intro" && (
        <div className="flex flex-col items-center text-center space-y-8 w-full max-w-sm mt-12">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <BookOpen className="w-6 h-6" />
            <span className="font-semibold text-lg">수학 퀴즈</span>
          </div>
          <div className="space-y-4 w-full">
            <h2 className="text-3xl font-extrabold text-slate-800">이름을 알려주세요!</h2>
            <p className="text-slate-500">퀴즈를 풀기 전에 이름을 입력해주세요.</p>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="홍길동"
              className="w-full px-6 py-4 mt-4 rounded-full bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-slate-700 text-lg text-center"
              onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
            />
          </div>
          <button 
            onClick={startQuiz}
            disabled={!studentName.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-medium shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg active:scale-95"
          >
            퀴즈 시작하기
          </button>
        </div>
      )}

      {step === "quiz" && (
        <div className="flex flex-col items-center text-center space-y-10 w-full max-w-md mt-8">
          <div className="w-full flex justify-between items-center text-slate-500 px-4">
            <span className="font-medium bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
              문제 {currentIdx + 1} / {questions.length}
            </span>
            <span className="font-medium text-sm">참여자: {studentName}</span>
          </div>

          <div className="text-6xl md:text-7xl font-black text-slate-800 tracking-tighter font-mono bg-white/60 p-10 rounded-[2rem] shadow-sm border border-white w-full">
            {questions[currentIdx].a} {questions[currentIdx].operator === '*' ? '×' : questions[currentIdx].operator} {questions[currentIdx].b} = ?
          </div>

          <form onSubmit={handleAnswerSubmit} className="w-full flex flex-col space-y-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="정답 입력"
              className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 font-bold text-2xl text-center"
              autoFocus
            />
            <button 
              type="submit"
              disabled={!userAnswer}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-medium shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:scale-95"
            >
              제출하기
            </button>
          </form>
        </div>
      )}

      {step === "result" && (
        <div className="flex flex-col items-center w-full max-w-md space-y-8 mt-4">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full mb-2">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">퀴즈 완료!</h2>
            <div className="text-xl text-slate-600">
              <span className="font-bold text-slate-900">{studentName}</span>님의 점수:
            </div>
            <div className="text-6xl font-black text-emerald-500 font-mono">
              {score} / {questions.length}
            </div>
          </div>

          <button 
            onClick={() => setStep("intro")}
            className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-full font-medium shadow-sm transition-all active:scale-95"
          >
            다시 하기
          </button>

          <div className="w-full pt-8 border-t border-slate-200/50">
            <div className="flex items-center gap-2 text-slate-700 font-bold mb-4 px-2">
              <User className="w-5 h-5" />
              <span>최근 참여자 기록</span>
            </div>
            {isSaving ? (
              <div className="text-center text-slate-400 py-4">기록 저장 중...</div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((res, i) => (
                  <div key={res.id || i} className="flex justify-between items-center bg-white/60 p-4 rounded-2xl shadow-sm border border-white">
                    <span className="font-medium text-slate-700">{res.student_name}</span>
                    <span className="font-bold text-emerald-600 font-mono bg-emerald-50 px-3 py-1 rounded-full">
                      {res.score} / {res.total_questions}
                    </span>
                  </div>
                ))}
                {leaderboard.length === 0 && (
                  <div className="text-center text-slate-400 text-sm">아직 기록이 없습니다.</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "timer" | "graph" | "quiz">("home");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-emerald-100/50 shadow-sm transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">수</span>
            </div>
            <span className="font-semibold text-lg text-slate-800">수학교실</span>
          </div>
          
          <nav className="flex items-center bg-emerald-100/50 p-1 rounded-full border border-emerald-200/50 overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab("home")}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "home" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              홈
            </button>
            <button 
              onClick={() => setActiveTab("timer")}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "timer" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              타이머
            </button>
            <button 
              onClick={() => setActiveTab("graph")}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "graph" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              그래프
            </button>
            <button 
              onClick={() => setActiveTab("quiz")}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "quiz" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              퀴즈
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {activeTab === "home" && <HomeContent />}
        {activeTab === "timer" && <TimerContent />}
        {activeTab === "graph" && <GraphContent />}
        {activeTab === "quiz" && <QuizContent />}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} 수학교실. All rights reserved.</p>
      </footer>
    </div>
  );
}
