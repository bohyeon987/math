"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Play, Pause, RotateCcw, Clock, LineChart as LineChartIcon, BookOpen, User, Trophy, Gamepad2, Bot, Send, Camera, X } from "lucide-react";
import { evaluate } from "mathjs";
import { useChat } from "ai/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";

function HomeContent() {
  return (
    <div className="w-full max-w-5xl flex flex-col space-y-12">
      <div className="text-center space-y-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          고등학교 수학 탐구
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          원하는 학습 섹션을 선택하여 심도 있는 수학 탐구를 시작하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 극한 섹션 */}
        <section className="flex flex-col items-center text-center space-y-6 py-12 px-6 bg-gradient-to-b from-blue-50 to-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="font-bold text-2xl font-mono">lim</span>
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-bold text-slate-800">극한</h2>
            <p className="text-slate-500 text-sm">
              함수와 수열의 극한 개념을 시각적으로 탐구하고 무한의 성질을 이해합니다.
            </p>
          </div>
          <button className="w-full px-6 py-3 rounded-full bg-blue-100 text-blue-600 font-bold hover:bg-blue-200 transition-colors">
            학습 시작하기
          </button>
        </section>

        {/* 미분 섹션 */}
        <section className="flex flex-col items-center text-center space-y-6 py-12 px-6 bg-gradient-to-b from-emerald-50 to-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="font-bold text-2xl font-mono">dx</span>
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-bold text-slate-800">미분</h2>
            <p className="text-slate-500 text-sm">
              변화율과 접선의 기울기를 구하며, 함수의 개형과 극값을 분석합니다.
            </p>
          </div>
          <button className="w-full px-6 py-3 rounded-full bg-emerald-100 text-emerald-600 font-bold hover:bg-emerald-200 transition-colors">
            학습 시작하기
          </button>
        </section>

        {/* 주제탐구 섹션 */}
        <section className="flex flex-col items-center text-center space-y-6 py-12 px-6 bg-gradient-to-b from-purple-50 to-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-bold text-slate-800">주제탐구</h2>
            <p className="text-slate-500 text-sm">
              실생활 응용 문제 및 심화 수학 주제를 스스로 설정하고 심도 있게 탐구합니다.
            </p>
          </div>
          <button className="w-full px-6 py-3 rounded-full bg-purple-100 text-purple-600 font-bold hover:bg-purple-200 transition-colors">
            학습 시작하기
          </button>
        </section>
      </div>
    </div>
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

function GameContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set logical size
    canvas.width = 400;
    canvas.height = 500;

    let animationFrameId: number;
    let scoreCount = 0;
    let isGameRunning = true;

    const player = { x: canvas.width / 2 - 20, y: canvas.height - 60, width: 40, height: 40, speed: 6 };
    const bullets: { x: number, y: number, width: number, height: number, speed: number }[] = [];
    
    type Enemy = { x: number, y: number, width: number, height: number, speed: number, type: number };
    const enemies: Enemy[] = [];
    
    const buildings = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 400,
      y: Math.random() * 500,
      w: 30 + Math.random() * 40,
      h: 50 + Math.random() * 80,
      color: ['#1e293b', '#334155', '#0f172a'][Math.floor(Math.random() * 3)],
      speed: 1 + Math.random() * 2
    }));

    const keys = { ArrowLeft: false, ArrowRight: false };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
      if (e.code === 'ArrowRight') keys.ArrowRight = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
      if (e.code === 'ArrowRight') keys.ArrowRight = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    let lastShotTime = 0;
    let lastEnemyTime = 0;

    const render = (time: number) => {
      if (!isGameRunning) return;

      // Draw city background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      buildings.forEach(b => {
        b.y += b.speed;
        if (b.y > canvas.height) {
          b.y = -b.h;
          b.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });

      // Player Movement
      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

      // Automatic Shooting
      if (time - lastShotTime > 150) {
        bullets.push({ x: player.x + player.width / 2 - 4, y: player.y - 10, width: 8, height: 16, speed: 8 });
        lastShotTime = time;
      }

      // Spawn Enemies
      const spawnDelay = Math.max(800, 1500 - scoreCount * 10); 
      if (time - lastEnemyTime > spawnDelay) {
        enemies.push({ 
          x: Math.random() * (canvas.width - 80) + 20, // keep away from edges
          y: -60, 
          width: 60,
          height: 60, 
          speed: 1.5 + Math.random() * 1.0 + (scoreCount * 0.02),
          type: Math.floor(Math.random() * 3)
        });
        lastEnemyTime = time;
      }

      // Draw Player
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.fill();

      // Update and Draw Bullets
      ctx.fillStyle = '#f59e0b';
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        if (bullet.y < 0) bullets.splice(i, 1);
      }

      // Update and Draw Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemy.speed;
        const color = enemy.type === 0 ? '#ef4444' : enemy.type === 1 ? '#8b5cf6' : '#ec4899';
        
        // Draw Hexagon obstacle
        ctx.beginPath();
        const centerX = enemy.x + enemy.width / 2;
        const centerY = enemy.y + enemy.height / 2;
        const radius = enemy.width / 2;
        for (let k = 0; k < 6; k++) {
          const angle = (Math.PI / 3) * k;
          const hx = centerX + radius * Math.cos(angle);
          const hy = centerY + radius * Math.sin(angle);
          if (k === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Check Collision with player
        if (
          player.x < enemy.x + enemy.width &&
          player.x + player.width > enemy.x &&
          player.y < enemy.y + enemy.height &&
          player.height + player.y > enemy.y
        ) {
          isGameRunning = false;
          setIsGameOver(true);
          setIsPlaying(false);
          return;
        }

        // Check Collision with bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const bullet = bullets[j];
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.height + bullet.y > enemy.y
          ) {
            bullets.splice(j, 1);
            enemies.splice(i, 1);
            scoreCount += 10;
            setScore(scoreCount);
            break; // Bullet consumed
          }
        }

        // Remove if off screen
        if (enemy && enemy.y > canvas.height) {
          enemies.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      isGameRunning = false;
    };
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <section className="max-w-2xl w-full flex flex-col items-center py-12 px-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/60 min-h-[600px]">
      <div className="flex flex-col items-center text-center space-y-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <Gamepad2 className="w-6 h-6" />
          <span className="font-semibold text-lg">클래식 슈팅 게임</span>
        </div>
        {!isPlaying && !isGameOver && (
          <p className="text-slate-500 max-w-sm">
            방향키(⬅️ ➡️)로 이동하세요!<br/>
            떨어지는 육각형 장애물을 파괴하여 점수를 획득하세요.
          </p>
        )}
      </div>

      <div className="relative">
        <div className="absolute top-4 left-4 z-10 font-mono font-bold text-lg text-slate-800 bg-white/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-slate-200 shadow-sm">
          SCORE: {score}
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="bg-slate-900 rounded-3xl shadow-inner border-[6px] border-slate-800 w-[400px] h-[500px]"
          width={400} 
          height={500} 
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 rounded-3xl backdrop-blur-sm z-20">
            {isGameOver && (
              <div className="text-center mb-6">
                <h3 className="text-4xl font-black text-red-500 mb-2">GAME OVER</h3>
                <p className="text-2xl text-white font-mono">Final Score: {score}</p>
              </div>
            )}
            <button 
              onClick={startGame}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              {isGameOver ? '다시 시작' : '게임 시작'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ChatContent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;
    
    handleSubmit(e, {
      data: selectedImage ? { image: selectedImage } : undefined
    });
    setSelectedImage(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="max-w-3xl w-full flex flex-col bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-lg border border-white/80 h-[700px] overflow-hidden">
      <div className="flex items-center gap-3 p-6 border-b border-white/60 bg-white/40">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-800">AI 수학 멘토</h2>
          <p className="text-xs text-slate-500">무엇이든 물어보세요! 친절하게 설명해 드릴게요.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
            <Bot className="w-16 h-16 opacity-20" />
            <p>어떤 수학 문제든 물어보세요!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-emerald-500 text-white rounded-br-sm' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm border border-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
          </div>
        )}
        {error && (
          <div className="flex justify-center my-4">
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl shadow-sm text-sm max-w-[80%] text-center border border-red-100">
              <span className="font-bold">오류 발생:</span> {error.message || '응답을 받아오지 못했습니다. API 키나 네트워크 연결을 확인해주세요.'}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/80 border-t border-slate-100 flex flex-col gap-2">
        {selectedImage && (
          <div className="relative inline-block w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <img src={selectedImage} alt="첨부 이미지" className="w-full h-full object-cover" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <form onSubmit={handleChatSubmit} className="flex gap-2 items-center">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
            title="이미지 첨부"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input
            className="flex-1 bg-white border border-slate-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm"
            value={input}
            placeholder="궁금한 수학 질문이나 수식 이미지를 첨부하세요..."
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="w-12 h-12 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-all shadow-md"
          >
            <Send className="w-5 h-5 -ml-1" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "timer" | "graph" | "quiz" | "game" | "chat">("home");

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
            <button 
              onClick={() => setActiveTab("game")}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "game" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              게임
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "chat" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              AI 멘토
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
        {activeTab === "game" && <GameContent />}
        {activeTab === "chat" && <ChatContent />}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} 수학교실. All rights reserved.</p>
      </footer>
    </div>
  );
}
