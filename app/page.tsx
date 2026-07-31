import { Plus } from "lucide-react";

export default function Home() {
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
          <nav>
            {/* Navigation links could go here */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
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
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} 수학교실. All rights reserved.</p>
      </footer>
    </div>
  );
}
