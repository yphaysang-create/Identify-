
import React, { useState } from 'react';
import { AssessmentQuestion } from '../types';
import { 
  CheckCircle, 
  ArrowRight, 
  RotateCcw, 
  BarChart2, 
  ShieldCheck, 
  UserCheck, 
  Beaker, 
  Stethoscope, 
  Droplet, 
  AlertCircle 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Questions derived directly from the OCR Compliance Checklist (SP-BQP-002-205-03)
// Expanded to 12 points to match the user's Google Sheet structure
const COMPLIANCE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "1. ขั้นตอนทั่วไป: คุณได้สแกน Barcode และใช้ตัวบ่งชี้อย่างน้อย 2 อย่าง (ชื่อ-สกุล, วันเกิด, อายุ หรือเลขบัตรประชาชน) หรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 2,
    question: "2. การรับใหม่/รับย้าย: คุณได้สแกน QR Code จากป้ายข้อมือทุกครั้งเพื่อยืนยันตัวตนหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 3,
    question: "3. ห้องแล็บ (การบ่งชี้): คุณได้ตรวจสอบความถูกต้องกับคำสั่งแพทย์และจัดทำสติ๊กเกอร์ระบุตัวตนได้ถูกต้องหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 4,
    question: "4. ห้องแล็บ (การตรวจสอบ): คุณได้สแกน QR Code เพื่อตรวจสอบความถูกต้องกับป้ายข้อมือและอุปกรณ์เก็บสิ่งส่งตรวจหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 5,
    question: "5. ห้องแล็บ (การเก็บสิ่งส่งตรวจ): คุณได้ใส่สิ่งส่งตรวจลงในหลอด 'ต่อหน้าผู้ป่วย' และตรวจสอบชื่อ-สกุลซ้ำอีกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 6,
    question: "6. ผ่าตัด/หัตถการ: คุณได้สแกน QR Code ระบุตัวตนเทียบกับป้ายข้อมือและแฟ้มประวัติก่อนเริ่มหัตถการทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 7,
    question: "7. การให้ยา: คุณได้ถามชื่อ-นามสกุล วันเดือนปีเกิด และตรวจสอบร่วมกับ MAR (Medical Administration Record) ทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 8,
    question: "8. จองเลือด (ระบบ HIS): คุณได้ตรวจสอบคำสั่งใน HIS และพิมพ์ใบขอเลือดพร้อมลงลายมือชื่อผู้คีย์และผู้ตรวจสอบหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 9,
    question: "9. จองเลือด (การเตรียม): คุณได้เตรียมหลอดเลือดและสอบถามชื่อ-สกุล/วันเกิด จากผู้ป่วยหรือญาติก่อนเจาะเลือดหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 10,
    question: "10. จองเลือด (การเจาะ): คุณได้เจาะเลือดและใส่หลอดต่อหน้าผู้ป่วย พร้อมลงชื่อในสติ๊กเกอร์ข้างหลอดเลือดทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 11,
    question: "11. การเบิกเลือด: คุณได้ตรวจสอบชนิด จำนวน และชื่อ-สกุล HN ให้ถูกต้องครบถ้วนก่อนคีย์เบิกในระบบคอมพิวเตอร์หรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  },
  {
    id: 12,
    question: "12. การให้เลือด: คุณได้ทำ Independent Double Check (2 คน) หรือ 7 See และสแกน QR ก่อนเริ่มให้เลือดทุกครั้งหรือไม่?",
    options: ["ปฏิบัติครบถ้วนทุกครั้ง", "ปฏิบัติเป็นบางครั้ง", "ไม่ได้ปฏิบัติ", "ไม่มีข้อมูล"],
    category: 'behavior'
  }
];

const Assessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for Pre-assessment form
  const [userName, setUserName] = useState('');
  const [userWard, setUserWard] = useState('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && userWard) {
      setCurrentStep(0);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (currentStep < COMPLIANCE_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateRawScore = () => {
    let score = 0;
    answers.forEach((ans) => {
      if (ans === 0) score += 1;
      else if (ans === 1) score += 0.5;
    });
    return score;
  };

  const calculateCompliancePercentage = () => {
    let totalScore = 0;
    let validAnswersCount = 0;

    answers.forEach((ans) => {
      if (ans === 3) return; // Skip "ไม่มีข้อมูล"
      
      validAnswersCount++;
      if (ans === 0) totalScore += 100;
      else if (ans === 1) totalScore += 50;
    });

    if (validAnswersCount === 0) return 0;
    return Math.round(totalScore / validAnswersCount);
  };

  const getWrongAnswers = () => {
    return answers
      .map((ans, idx) => {
        if (ans === 1 || ans === 2) {
          return `ข้อ ${idx + 1}: ${COMPLIANCE_QUESTIONS[idx].options[ans]}`;
        }
        return null;
      })
      .filter(Boolean) as string[];
  };

  const handleSubmit = async () => {
    const scriptUrl = process.env.VITE_GOOGLE_SHEET_URL;
    if (!scriptUrl) {
      console.error("Google Sheet URL not configured");
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    const rawScore = calculateRawScore();
    const complianceRate = calculateCompliancePercentage();
    const wrongAnswers = getWrongAnswers();
    
    const payload = {
      name: userName,
      ward: userWard,
      score: rawScore, // Sending raw score to match "data.score + ' / 12'" in Apps Script
      wrongAnswers: wrongAnswers.length > 0 ? wrongAnswers : ["ไม่มีขั้นตอนผิดพลาด"],
      analysis: complianceRate === 100 
        ? "ปฏิบัติตามมาตรฐานครบถ้วน 100%" 
        : complianceRate >= 80 
          ? "มีพฤติกรรมความปลอดภัยที่ดี แต่ยังมีจุดเสี่ยงเล็กน้อย" 
          : "พบช่องว่างความเสี่ยงสูง ควรได้รับการอบรมเพิ่มเติม",
      allAnswers: answers.map((ans, idx) => COMPLIANCE_QUESTIONS[idx].options[ans])
    };

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setSubmitStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const complianceRate = calculateCompliancePercentage();

  const chartData = [
    { name: 'สอดคล้อง (Compliance)', value: complianceRate, color: '#2563eb' },
    { name: 'ความเสี่ยง (Gap)', value: 100 - complianceRate, color: '#e2e8f0' },
  ];

  // Pre-assessment Form
  if (currentStep === -1) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 animate-fadeIn">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">ข้อมูลผู้รับการประเมิน</h2>
            <p className="text-slate-500">โปรดระบุข้อมูลเพื่อบันทึกผลการประเมิน</p>
          </div>

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ชื่อ-นามสกุล</label>
              <input 
                required
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ระบุชื่อ-นามสกุล"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">หอผู้ป่วย / หน่วยงาน</label>
              <select 
                required
                value={userWard}
                onChange={(e) => setUserWard(e.target.value)}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all appearance-none"
              >
                <option value="">เลือกหอผู้ป่วย</option>
                <option value="EYE">หอผู้ป่วย EYE</option>
                <option value="ENT">หอผู้ป่วย ENT</option>
                <option value="Ortho">หอผู้ป่วย Ortho</option>
                <option value="VIP Ortho">หอผู้ป่วย VIP Ortho</option>
                <option value="Surg1">หอผู้ป่วย Surg1</option>
                <option value="VIP Surg1">หอผู้ป่วย VIP Surg1</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              เริ่มการประเมิน
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fadeIn max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart2 size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">ดัชนีความสอดคล้อง (Compliance Index)</h2>
          <p className="text-slate-500">ผู้ประเมิน: {userName} ({userWard})</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black text-slate-800">{complianceRate}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Compliance</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border-2 ${complianceRate >= 90 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                {complianceRate >= 90 ? <ShieldCheck className="text-green-600" /> : <AlertCircle className="text-amber-600" />}
                <h4 className={`font-bold ${complianceRate >= 90 ? 'text-green-800' : 'text-amber-800'}`}>
                  {complianceRate >= 90 ? 'ระดับความปลอดภัยสูงมาก' : 'ต้องการการปรับปรุงพฤติกรรม'}
                </h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {complianceRate === 100 
                  ? "ยอดเยี่ยม! คุณปฏิบัติตาม SOP SP-BQP-002-205-03 ได้ครบถ้วน 100% ช่วยลดความเสี่ยง Zero Identification Error ได้อย่างแท้จริง" 
                  : complianceRate >= 80 
                    ? "คุณมีพฤติกรรมความปลอดภัยที่ดี แต่ยังมีจุดที่อาจเกิดความผิดพลาดได้ แนะนำให้ทบทวนขั้นตอนการตรวจสอบหน้าผู้ป่วยและสแกน QR ทุกครั้ง" 
                    : "พบช่องว่างความเสี่ยงในการระบุตัวตน (Safety Gap) โปรดทบทวนขั้นตอนการทำ Independent Double Check และการติดสติกเกอร์ Lab ต่อหน้าผู้ป่วยโดยด่วน"}
              </p>
            </div>

            {submitStatus === 'idle' && (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "กำลังบันทึก..." : "ส่งข้อมูลไปยัง Google Sheets"}
              </button>
            )}

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-2xl text-center font-bold flex items-center justify-center gap-2">
                <CheckCircle size={20} /> บันทึกข้อมูลสำเร็จ
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-2xl text-center font-bold">
                เกิดข้อผิดพลาดในการบันทึกข้อมูล
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => {
              setCurrentStep(-1);
              setAnswers([]);
              setShowResult(false);
              setSubmitStatus('idle');
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
          >
            <RotateCcw size={20} />
            เริ่มต้นประเมินใหม่
          </button>
          <p className="text-[10px] text-slate-400 max-w-[200px] text-center sm:text-left font-medium">
            *ผลการประเมินนี้อ้างอิงจาก Compliance Checklist งานพยาบาลศัลยกรรม NUH
          </p>
        </div>
      </div>
    );
  }

  const question = COMPLIANCE_QUESTIONS[currentStep];

  const getStepIcon = (index: number) => {
    switch(index) {
      case 0: return <UserCheck size={24} />;
      case 1: return <ShieldCheck size={24} />;
      case 2: return <Beaker size={24} />;
      case 3: return <Stethoscope size={24} />;
      case 4: return <AlertCircle size={24} />;
      case 5: return <Droplet size={24} />;
      case 6: return <UserCheck size={24} />;
      case 7: return <ShieldCheck size={24} />;
      case 8: return <Beaker size={24} />;
      case 9: return <Stethoscope size={24} />;
      case 10: return <AlertCircle size={24} />;
      case 11: return <Droplet size={24} />;
      default: return <CheckCircle size={24} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Self-Assessment Tool</h2>
        <p className="text-slate-500 font-medium">ตรวจสอบความสอดคล้องตามมาตรฐาน (SOP-SP-BQP-002-205-03)</p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              {getStepIcon(currentStep)}
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Section {currentStep + 1}</p>
              <p className="text-slate-400 text-xs font-bold uppercase">Compliance Audit</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-800">{currentStep + 1}</span>
            <span className="text-slate-300 font-bold"> / {COMPLIANCE_QUESTIONS.length}</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 shadow-inner">
          <div 
            className="bg-blue-600 h-full transition-all duration-700 ease-out" 
            style={{ width: `${((currentStep + 1) / COMPLIANCE_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-50 animate-slideUp">
        <h3 className="text-2xl font-bold text-slate-800 mb-10 leading-snug">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all duration-300 flex items-center justify-between group active:scale-[0.98] ${
                index === 0 
                ? 'bg-blue-50/30 border-slate-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white' 
                : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <span className="font-bold text-lg">{option}</span>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors group-hover:scale-110 ${
                index === 0 ? 'border-blue-200 group-hover:border-white' : 'border-slate-200'
              }`}>
                <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-slate-400">
        <ShieldCheck size={14} />
        <p className="text-[10px] font-bold uppercase tracking-widest">Data Analysis & Safety Verification System</p>
      </div>
    </div>
  );
};

export default Assessment;
