
import React from 'react';
import { CheckCircle2, AlertCircle, ShieldCheck, Video, FileText, Droplets, Syringe, Scissors } from 'lucide-react';

const Education: React.FC = () => {
  const videoLinks = [
    { ward: 'หอผู้ป่วย EYE', url: 'https://drive.google.com/file/d/1EGkCJxD4QsxoliqdAWLqOf_9y2N8Qid7/view?usp=sharing' },
    { ward: 'หอผู้ป่วย ENT', url: 'https://drive.google.com/file/d/1iRWgBHImC8dfAkmtryOCQy6T3bBWJKMv/view?usp=sharing' },
    { ward: 'หอผู้ป่วย Ortho', url: 'https://drive.google.com/file/d/1s1MhzUOVo61Ql5tPIIpRwkmupRg8n8Qu/view?usp=sharing' },
    { ward: 'หอผู้ป่วย VIP Ortho', url: 'https://drive.google.com/file/d/1tPstWlRJrvOMHHLOD7PN6C9eSLuRYiPM/view?usp=sharing' },
    { ward: 'หอผู้ป่วย Surg1', url: 'https://drive.google.com/file/d/1h7CMYjdGaPqnkUnjFIU5HjewIBA9kHwK/view?usp=sharing' },
    { ward: 'หอผู้ป่วย VIP Surg1', url: 'https://drive.google.com/file/d/1C2DxGehGPkejurQx13M8cV0ZtbIWLKm/view?usp=sharing' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="mb-6">
        <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-2">
          SOP: SP-BQP-002-205-03
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Identify ดีไม่มีผิดพลาด</h2>
        <p className="text-slate-600 italic">งานการพยาบาลศัลยกรรม รพ.มหาวิทยาลัยนเรศวร</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-3">เป้าหมาย (Goals)</h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              อุบัติการณ์การระบุตัวตนผิดพลาดเป็น "ศูนย์" (Zero Error)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              บุคลากรปฏิบัติตามแนวทางได้ถูกต้อง 100%
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-3">ตัวบ่งชี้อย่างน้อย 2 อย่าง</h3>
          <p className="text-slate-500 text-sm mb-3">ห้ามใช้เลขเตียงหรือห้องพักเด็ดขาด</p>
          <div className="grid grid-cols-2 gap-2">
            {['ชื่อ-นามสกุล', 'วันเดือนปีเกิด', 'อายุ', 'เลข HN / AN'].map((item) => (
              <div key={item} className="bg-slate-50 p-2 rounded-lg text-sm text-slate-700 font-medium border border-slate-100 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white p-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText size={24} /> ขั้นตอนการปฏิบัติงานมาตรฐาน (SOP Checklist)
          </h3>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-100">1</div>
              <div>
                <h4 className="font-bold text-slate-800">การบ่งชี้ตัวผู้ป่วยทั่วไป</h4>
                <p className="text-sm text-slate-500 mt-1">สแกน Barcode และใช้ตัวบ่งชี้ 2 อย่างเสมอ (ห้ามใช้เลขเตียง) สแกน QR Code ทุกครั้งเมื่อรับใหม่/รับย้าย</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-100">2</div>
              <div>
                <h4 className="font-bold text-slate-800">การเจาะเลือด/เก็บสิ่งส่งตรวจ</h4>
                <p className="text-sm text-slate-500 mt-1">ตรวจสอบคำสั่งแพทย์ ติดสติกเกอร์ต่อหน้าผู้ป่วย สแกน QR Code และให้ผู้ป่วยยืนยันความถูกต้องซ้ำ</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-100">3</div>
              <div>
                <h4 className="font-bold text-slate-800">การส่งผ่าตัด/ทำหัตถการ</h4>
                <p className="text-sm text-slate-500 mt-1">สแกน QR Code ระบุตัวตัวเทียบกับป้ายข้อมือและแฟ้มประวัติก่อนทำหัตถการทุกครั้ง</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold border border-orange-100">4</div>
              <div>
                <h4 className="font-bold text-orange-700">การให้ยา (Drug Administration)</h4>
                <p className="text-sm text-slate-500 mt-1">ถามชื่อ-นามสกุล วันเดือนปีเกิด และตรวจสอบร่วมกับ MAR (Medical Administration Record) ทุกครั้ง</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold border border-orange-100">5</div>
              <div>
                <h4 className="font-bold text-orange-700">การให้เลือด (Blood Transfusion)</h4>
                <p className="text-sm text-slate-500 mt-1">ตรวจสอบ Physician's Order Sheet และใช้หลัก Independent Double Check (พยาบาล 2 คน) ก่อนเริ่มให้เลือด</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold border border-orange-100">6</div>
              <div>
                <h4 className="font-bold text-orange-700">หลักการ 7 See (กรณีอยู่คนเดียว)</h4>
                <p className="text-sm text-slate-500 mt-1">Self Independent Double Check ตรวจสอบซ้ำด้วยตนเองอย่างเป็นระบบ เว้นช่วงเวลา แล้วตรวจซ้ำเสมือนเป็นคนที่ 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
        <h3 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-2">
          <Video size={24} /> สื่อวิดีโอประกอบการเรียนรู้ (Clip VDO)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videoLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-2xl border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-500 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Video size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-700">{link.ward}</span>
              </div>
              <FileText size={16} className="text-slate-300 group-hover:text-orange-500" />
            </a>
          ))}
        </div>
      </section>

      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
        <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
        <div>
          <h4 className="text-red-800 font-bold mb-1">หลักการ Independent Double Check (7 See)</h4>
          <p className="text-red-700 text-sm leading-relaxed">
            กรณีพยาบาลขึ้นเวรคนเดียว ให้ตรวจสอบซ้ำด้วยตนเองอย่างเป็นระบบ เว้นช่วงเวลา แล้วตรวจซ้ำเสมือนเป็นคนที่ 2 พร้อมลงลายมือชื่อกำกับ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
