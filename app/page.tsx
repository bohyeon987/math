"use client";

import { useState, useEffect } from "react";
import { Plus, Play, Pause, RotateCcw, Clock } from "lucide-react";

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

      <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
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
        <button onClick={toggleTimer} className={`flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${isRunning ? 'bg-amber-500 shadow-amber-500/20 hover:bg-amber-600' : 'bg-blue-500 shadow-blue-500/20 hover:bg-blue-600'}`}>
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "timer">("home");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-100/50 shadow-sm transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">수</span>
            </div>
            <span className="font-semibold text-lg text-slate-800">수학교실</span>
          </div>
          
          <nav className="flex items-center bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "home" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              홈
            </button>
            <button 
              onClick={() => setActiveTab("timer")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === "timer" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              타이머
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {activeTab === "home" ? <HomeContent /> : <TimerContent />}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} 수학교실. All rights reserved.</p>
      </footer>
    </div>
  );
}
