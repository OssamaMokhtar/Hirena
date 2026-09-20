// Hirena — Internationalization (i18n)
// Simple context-based i18n without external libraries.
// Stores language in localStorage + Supabase profile preferences.
// Supports: "en" (English) and "ar" (Arabic).
// When Arabic is active, the document direction is set to RTL.

export type Language = "en" | "ar";

export const LANGUAGES: Record<Language, { code: Language; name: string; nativeName: string; dir: "ltr" | "rtl" }> = {
  en: { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
};

// ─── Translation Dictionary ──────────────────────────────────────────────────
// String translations: key → { en: "...", ar: "..." }
export const I18N: Record<string, Record<Language, string>> = {
  // ── Common ────────────────────────────────────────────────────────────────
  "common.save": { en: "Save", ar: "حفظ" },
  "common.cancel": { en: "Cancel", ar: "إلغاء" },
  "common.close": { en: "Close", ar: "إغلاق" },
  "common.loading": { en: "Loading...", ar: "جارٍ التحميل..." },
  "common.error": { en: "Error", ar: "خطأ" },
  "common.success": { en: "Success", ar: "نجاح" },
  "common.back": { en: "Back", ar: "رجوع" },
  "common.next": { en: "Next", ar: "التالي" },
  "common.previous": { en: "Previous", ar: "السابق" },
  "common.submit": { en: "Submit", ar: "إرسال" },
  "common.skip": { en: "Skip", ar: "تخطي" },
  "common.dismiss": { en: "Dismiss", ar: "إغلاق" },
  "common.search": { en: "Search", ar: "بحث" },
  "common.filter": { en: "Filter", ar: "تصفية" },
  "common.all": { en: "All", ar: "الكل" },
  "common.free": { en: "Free", ar: "مجاني" },
  "common.paid": { en: "Paid", ar: "مدفوع" },
  "common.audit": { en: "Audit", ar: "تصفح مجاني" },
  "common.hours": { en: "{n} hrs", ar: "{n} ساعات" },
  "common.level": { en: "Level {n}", ar: "المستوى {n}" },
  "common.years": { en: "{n} years", ar: "{n} سنوات" },

  // ── Nav / Header ───────────────────────────────────────────────────────────
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.signIn": { en: "Sign In", ar: "تسجيل الدخول" },
  "nav.trackProgress": { en: "Track Progress", ar: "متابعة التقدم" },
  "nav.settings": { en: "Settings", ar: "الإعدادات" },
  "nav.language": { en: "Language", ar: "اللغة" },
  "nav.exploreVision": { en: "Explore the Vision", ar: "استكشاف الرؤية" },

  // ── Landing Page ───────────────────────────────────────────────────────────
  "landing.logo": { en: "Hirena", ar: "هيرينا" },
  "landing.hero.tagline": { en: "Know Your Skills. Grow Your Career.", ar: "اعرف مهاراتك. Develop مسارك المهني." },
  "landing.hero.line1": { en: "Know where you stand.", ar: "اعرف مكانك." },
  "landing.hero.line2": { en: "See what's next.", ar: "شاهد ما هو القادم." },
  "landing.hero.line3": { en: "Get there.", ar: "وصول هناك." },
  "landing.hero.subtitleLong": { en: "Hirena is an AI-powered skills assessment and career development platform. Assess your skills against target roles, benchmark against the market, and get a personalized roadmap to accelerate your career.", ar: "هيرينا هي منصة تقييم مهارات وتطوير مهني مدعومة بالذكاء الاصطناعي. قّيم مهاراتك مقابل الأدوار المستهدفة، قارن نفسك بالسوق، واحصل على خارطة طريق مميزة لتسريع مسيرتك المهنية." },
  "landing.hero.subtitle": { en: "AI-powered skills assessment for MENA professionals. Get a personalized roadmap to your target role.", ar: "تقييم مهارات بالذكاء الاصطناعي للمهنيين في المنطقة. احصل على خارطة طريق مميزة نحو دورك المستهدف." },
  "landing.cta.demo": { en: "See a demo assessment", ar: "شاهد تقييم تجريبي" },
  "landing.cta.start": { en: "Start Free Assessment", ar: "ابدأ تقييم مجاني" },
  "landing.cta.video": { en: "Start Video Interview", ar: "ابدأ مقابلة فيديو" },
  "landing.trust.privacy": { en: "Your data is private", ar: "بياناتك خاصة" },
  "landing.trust.free": { en: "Free to use", ar: "مجاني الاستخدام" },
  "landing.trust.noAccount": { en: "No account required", ar: "لا يشترط حساب" },
  "landing.trust.private": { en: "Your data stays private", ar: "بياناتك تظل خاصة" },
  "landing.trust.takes5to10": { en: "Takes 5-10 minutes", ar: "يستغرق 5-10 دقائق" },
  "landing.ctaSectionReady": { en: "Ready to understand your career potential?", ar: "جاهز لفهم إمكانياتك المهنية؟" },
  "landing.ctaSectionJoin": { en: "Join hundreds of professionals who are using Hirena to assess their skills, identify gaps, and build a clearer path to their target role.", ar: "انضم لمئات المهنيين الذين يستخدمون هيرينا لتقييم مهاراتهم، وتحديد الفجوات، وبناء مسار واضح نحو دورهم المستهدف." },
  "landing.ctaSection.title": { en: "Ready to understand your career potential?", ar: "جاهز لفهم إمكانياتك المهنية؟" },
  "landing.ctaSection.subtitle": { en: "Join hundreds of professionals who are using Hirena to assess their skills, identify gaps, and build a clearer path to their target role.", ar: "انضم لمئات المهنيين الذين يستخدمون هيرينا لتقييم مهاراتهم، وتحديد الفجوات، وبناء مسار واضح نحو دورهم المستهدف." },
  "landing.howItWorks.title": { en: "How It Works", ar: "كيف يعمل" },
  "landing.howItWorks.step1.title": { en: "Create Your Profile", ar: "أنشئ ملفك الشخصي" },
  "landing.howItWorks.step1.desc": { en: "Tell us about your current role, experience, and career goals. Quick and lightweight — we only ask what matters.", ar: "أخبرنا عن دورك الحالي، خبرتك، وأهدافك المهنية. سريع وخفيف — نسأل فقط عما يهم." },
  "landing.howItWorks.step2.title": { en: "Set Your Goal", ar: "حدد هدفك" },
  "landing.howItWorks.step2.desc": { en: "Choose your target role and region. This becomes your benchmark — the standard we measure against.", ar: "اختر دورك المستهدف ومنطقتك. هذا سيكون معيارك — المستوى الذي نقيس tegenه." },
  "landing.howItWorks.step3.title": { en: "Assess Your Skills", ar: "قيّم مهاراتك" },
  "landing.howItWorks.step3.desc": { en: "Rate yourself across 30+ skills using our 0-5 proficiency scale. Then let AI analyze your experience descriptions for an objective read. Takes 5-10 minutes.", ar: "قّيم نفسك عبر 30+ مهارة باستخدام مقياسنا من 0 إلى 5. ثم دع الذكاء الاصطناعي يحلل أوصاف خبرتك للحصول على قراءة موضوعية. يستغرق 5-10 دقائق." },
  "landing.howItWorks.step4.title": { en: "Get Your Roadmap", ar: "احصل على خريطتك" },
  "landing.howItWorks.step4.desc": { en: "Receive your overall score, skill ranking, gap analysis, personalized development roadmap, and curated learning resources. All tailored to your target role and region.", ar: "احصل على 점수ك الكلي، ترتيب مهاراتك، تحليل الفجوات، خارطة طريق التطوير الشخصية، وموارد التعلم المميزة. كلها مخصصة وفق دورك المستهدف ومنطقتك." },
  "landing.videoInterview.title": { en: "Video Interview Assessment", ar: "تقييم المقابلة المرئية" },
  "landing.videoInterview.subtitle": { en: "Practice with an AI mentor who asks real interview questions and analyzes your video responses. Get instant feedback on technical accuracy, communication, and problem-solving approach.", ar: "تمرن مع مرشد ذكاء اصطناعي يطرح أسئلة مقابلات حقيقية và يحلل ردود الفعل المرئية الخاصة بك. احصل على ملاحظات فورية حول الدقة التقنية، والتواصل، ومنهجية حل المشاكل." },
  "landing.videoInterview.roleLabel": { en: "Select your role for tailored questions:", ar: "اختر دورك لأسئلة مخصصة:" },
  "landing.videoInterview.timeNote": { en: "5 questions · 10-15 minutes · AI-powered analysis", ar: "5 أسئلة · 10-15 دقيقة · تحليل بالذكاء الاصطناعي" },

  // ── Assessment Wizard ──────────────────────────────────────────────────────
  "wizard.title": { en: "Skills Assessment", ar: "تقييم المهارات" },
  "wizard.step1.title": { en: "Your Profile", ar: "ملفك الشخصي" },
  "wizard.step1.subtitle": { en: "Tell us about yourself to personalize your assessment.", ar: "أخبرنا عن نفسك لنتائج تقييم مميزة." },
  "wizard.step1.roleLabel": { en: "Current role", ar: "دورك الحالي" },
  "wizard.step1.rolePlaceholder": { en: "Select your current role", ar: "اختر دورك الحالي" },
  "wizard.step1.experienceLabel": { en: "Years of experience", ar: "سنوات من الخبرة" },
  "wizard.step1.experiencePlaceholder": { en: "Select experience range", ar: "اختر نطاق الخبرة" },
  "wizard.step1.regionLabel": { en: "Region", ar: "المنطقة" },
  "wizard.step1.regionPlaceholder": { en: "Select your region", ar: "اختر منطقتك" },
  "wizard.step2.title": { en: "Your Goal", ar: "هدفك" },
  "wizard.step2.subtitle": { en: "What are you aiming for? This helps us tailor your roadmap.", ar: "ما الذي تتوجه نحو تحقيقه؟ هذا يساعدنا على تخصيص خريطتك." },
  "wizard.step2.roleLabel": { en: "Target role", ar: "الدور المستهدف" },
  "wizard.step2.rolePlaceholder": { en: "Select your target role", ar: "اختر دورك المستهدف" },
  "wizard.step2.trackLabel": { en: "Target track", ar: "المسار المستهدف" },
  "wizard.step2.trackPlaceholder": { en: "Select a track (optional)", ar: "اختر مسارًا (اختياري)" },
  "wizard.step2.goalLabel": { en: "Career goal", ar: "هدفك المهني" },
  "wizard.step3.title": { en: "Self-Assessment", ar: "التقييم الذاتي" },
  "wizard.step3.subtitle": { en: "Rate your proficiency in each skill. Be honest — this is for you.", ar: "قيّم مستوى إجادة كل مهارة. كن صادقًا — هذا من أجلك." },
  "wizard.step3.instruction": { en: "Rate each skill from 0 (no exposure) to 5 (expert).", ar: "قيّم كل مهارة من 0 (لا خبرة) إلى 5 (خبير)." },
  "wizard.step3.progress": { en: "Progress: {n} of {total} skills rated", ar: "التقدم: {n} من {total} مهارة مُقيمة" },
  "wizard.step3.skipHint": { en: "Unsure? Skip and come back later.", ar: "غير متأكد؟ تخطّى وارجع لاحقًا." },
  "wizard.step4.title": { en: "AI Skill Analysis", ar: "تحليل المهارات بالذكاء الاصطناعي" },
  "wizard.step4.subtitle": { en: "For skills you rated 3+, describe your experience. AI will compare its assessment vs yours.", ar: "للمهارات التي قّيمتها 3 فأكثر، صف خبرتك. سيقارن الذكاء الاصطناعي تقييمه مع تقييمك." },
  "wizard.step4.hint": { en: "Briefly describe your experience with {skill}.", ar: "صف باختصار خبرتك مع {skill}." },
  "wizard.step4.placeholder": { en: "e.g., Led a team of 3 developers, shipped 2 major features using React...", ar: "مثلاً، قاد فريقًا من 3 مطورين، وأطلق 2 ميزة رئيسية باستخدام React..." },
  "wizard.step4.submitAnalysis": { en: "Analyze with AI", ar: "حلل بالذكاء الاصطناعي" },
  "wizard.step4.confidence": { en: "AI confidence: {n}%", ar: "ثقة الذكاء الاصطناعي: {n}%" },
  "wizard.step5.title": { en: "Review & Submit", ar: "مراجعة وإرسال" },
  "wizard.step5.subtitle": { en: "Review your self-assessment and AI inferences before submitting.", ar: "راجع تقييمك الذاتي واستنتاجات الذكاء الاصطناعي قبل الإرسال." },
  "wizard.step5.selfRated": { en: "Self-rated", ar: "تقييم ذاتي" },
  "wizard.step5.aiInferred": { en: "AI-inferred", ar: "استنتاج بالذكاء الاصطناعي" },
  "wizard.step5.discrepancy": { en: "Discrepancy", ar: "تباين" },
  "wizard.step5.discrepancyHint": { en: "AI thinks you're at level {aiLevel} — {direction} than your self-rating of {selfLevel}.", ar: "يرى الذكاء الاصطناعي أنك ở المستوى {aiLevel} — {direction} من تقييمك الذاتي {selfLevel}." },
  "wizard.step5.confidenceLow": { en: "Low confidence — AI had limited info to work with.", ar: "ثقة منخفضة — كان لدى الذكاء الاصطناعي معلومات محدودة للعمل بها." },
  "wizard.submitButton": { en: "Submit Assessment", ar: "إرسال التقييم" },
  "wizard.aiDisclaimer": { en: "AI-generated assessments are coaching tools, not definitive evaluations. Use at your own discretion.", ar: "التقييمات المولدة بالذكاء الاصطناعي هي أدوات توجيهية، bukan تقييمات نهائية. استخدمها حسب 재량에ك." },

  // ── Results Dashboard ──────────────────────────────────────────────────────
  "results.title": { en: "Your Assessment Results", ar: "نتائج تقييمك" },
  "results.overallScore": { en: "Overall Score", ar: "الدرجة الكلية" },
  "results.scoreLabel": { en: "out of 100", ar: "من 100" },
  "results.scoreInterpretation": { en: "Interpretation", ar: "التفسير" },
  "results.competencyBreakdown": { en: "Competency Breakdown", ar: "تفصيل المهارات" },
  "results.pillar": { en: "Pillar: {name}", ar: " الركن: {name}" },
  "results.pillarDesc": { en: "{desc}", ar: "{desc}" },
  "results.skillsAssessed": { en: "{n} skills assessed", ar: "{n} مهارة مُقيمة" },
  "results.skillRanking": { en: "Skill Ranking", ar: "ترتيب المهارات" },
  "results.strength": { en: "Strength", ar: "نقطة قوة" },
  "results.onTrack": { en: "On Track", ar: "على المسار الصحيح" },
  "results.gap": { en: "Gap", ar: "فجوة" },
  "results.gapAnalysis": { en: "Gap Analysis", ar: "تحليل الفجوات" },
  "results.topGaps": { en: "Top {n} Gaps", ar: "أهم {n} فجوات" },
  "results.gapItem.current": { en: "Current: Level {n}", ar: "الحالي: المستوى {n}" },
  "results.gapItem.target": { en: "Target: Level {n}", ar: "الهدف: المستوى {n}" },
  "results.gapItem.size": { en: "Gap: {n} levels", ar: "الفجوة: {n} مستويات" },
  "results.gapItem.priority": { en: "Priority: {priority}", ar: "الأهمية: {priority}" },
  "results.roadmapActions": { en: "Roadmap Actions", ar: "خطوات الخارطة الطرقية" },
  "results.immediateActions": { en: "Immediate (1-3 months)", ar: "فوري (شهرين 1-3)" },
  "results.intermediateActions": { en: "Intermediate (3-6 months)", ar: "متوسط (3-6 أشهر)" },
  "results.longTermActions": { en: "Long-term (6-12 months)", ar: "طويل الأمد (6-12 شهر)" },
  "results.roadmapAction.skill": { en: "Skill: {skill}", ar: "المهارة: {skill}" },
  "results.roadmapAction.priority": { en: "Priority: {priority}", ar: "الأهمية: {priority}" },
  "results.missingSkills": { en: "Missing Skills", ar: "مهارات مفقودة" },
  "results.missingHint": { en: "Skills in your target role you haven't rated yet.", ar: "مهارات في دورك المستهدف لم تقّيمها بعد." },
  "results.careerLadder": { en: "Career Ladder", ar: "سلم المهن" },
  "results.careerLadderSubtitle": { en: "Target roles with expected proficiency levels by competency area", ar: "الأدوار المستهدفة مع مستويات الإجادة المتوقعة حسب مجال الكفاءة" },
  "results.assessmentComplete": { en: "Assessment Complete", ar: "اكتمل التقييم" },
  "results.viewDashboard": { en: "View Full Dashboard", ar: "عرض لوحة النتائج الكاملة" },
  "results.retake": { en: "Retake Assessment", ar: "إعادة التقييم" },
  "results.share": { en: "Share Results", ar: "مشاركة النتائج" },
  "results.trajectoryPreview": { en: "Skill Trajectory Preview", ar: "معاينة مسار المهارة" },
  "results.noPreviousAssessment": { en: "No previous assessment to compare. Complete another assessment to see your progress over time.", ar: "لا يوجد تقييم سابق للمقارنة. أكمل تقييمًا آخر لرؤية تقدمك مع الوقت." },

  // ── Progress Tracking Dashboard ────────────────────────────────────────────
  "progress.title": { en: "Your Progress", ar: "تقدمك" },
  "progress.subtitle": { en: "Track your skills assessment history and see how you're growing over time.", ar: "تتبع تاريخ تقييم مهاراتك وشاهد كيف تنمو مع الوقت." },
  "progress.tab.history": { en: "History", ar: "التاريخ" },
  "progress.tab.trajectory": { en: "Trajectory", ar: "المسار" },
  "progress.tab.comparison": { en: "Comparison", ar: "المقارنة" },
  "progress.empty": { en: "No assessments yet. Complete your first assessment to start tracking your progress.", ar: "لا يوجد تقييمات بعد. أكمل تقييمك الأول لتبدأ تتبع تقدمك." },
  "progress.latest": { en: "Latest Assessment", ar: "أحدث تقييم" },
  "progress.previous": { en: "Previous Assessment", ar: "التقييم السابق" },
  "progress.scoreChange.up": { en: "+{n} points", ar: "+{n} نقطة" },
  "progress.scoreChange.down": { en: "-{n} points", ar: "-{n} نقطة" },
  "progress.scoreChange.neutral": { en: "No change", ar: "بدون تغيير" },
  "progress.assessmentCard.role": { en: "Role: {role}", ar: "الدور: {role}" },
  "progress.assessmentCard.date": { en: "Completed on {date}", ar: "اكتمل في {date}" },
  "progress.assessmentCard.score": { en: "Score: {score}", ar: "الدرجة: {score}" },
  "progress.trajectory.title": { en: "Skill Trajectory Over Time", ar: "مسار المهارة مع الوقت" },
  "progress.trajectory.subtitle": { en: "Track how your skills change across assessments.", ar: "تتبع كيف تتغير مهاراتك across التقييمات." },
  "progress.trajectory.selectSkill": { en: "Select a skill to track", ar: "اختر مهارة لتتبعها" },
  "progress.trajectory.noData": { en: "Complete more assessments to see skill trajectories.", ar: "أكمل المزيد من التقييمات لرؤية مسارات المهارات." },
  "progress.comparison.title": { en: "Assessment Comparison", ar: "مقارنة التقييمات" },
  "progress.comparison.subtitle": { en: "Compare any two assessments side by side.", ar: "قارن أي تقييمين جنبًا إلى جنب." },
  "progress.comparison.selectFirst": { en: "Select first assessment", ar: "اختر التقييم الأول" },
  "progress.comparison.selectSecond": { en: "Select second assessment", ar: "اختر التقييم الثاني" },
  "progress.comparison.scoreDelta": { en: "Score change: {delta}", ar: "تغيير الدرجة: {delta}" },
  "progress.comparison.noSelections": { en: "Select two assessments above to compare.", ar: "اختر تقييمين أعلاه للمقارنة." },

  // ── Career Ladder Viz ──────────────────────────────────────────────────────
  "careerLadder.title": { en: "Career Progression Path", ar: "مسار تقدم المهن" },
  "careerLadder.subtitle": { en: "Typical progression from entry-level to executive roles. Your current level is marked.", ar: "التقدم النموذجي من المستوى الأولي إلى أدوار الإدارة العليا. مستواك الحالي موضّح." },
  "careerLadder.lvl": { en: "LVL {n}", ar: "المستوى {n}" },
  "careerLadder.years": { en: "{n}-{n} yrs", ar: "{n}-{n} سنة" },
  "careerLadder.currentLabel": { en: "CURRENT", ar: "الحالي" },
  "careerLadder.targetLabel": { en: "TARGET", ar: "الهدف" },
  "careerLadder.progressToNext": { en: "Progress to next level", ar: "التقدم نحو المستوى التالي" },
  "careerLadder.legend.current": { en: "Current role (based on your level)", ar: "الدور الحالي (حسب مستواك)" },
  "careerLadder.legend.past": { en: "Achieved / past roles", ar: "الأدوار المحققة / السابقة" },
  "careerLadder.legend.future": { en: "Future / target roles", ar: "الأدوار المستقبلية / المستهدفة" },

  // ── Learning Resources Panel ───────────────────────────────────────────────
  "learning.title": { en: "Learning Resources", ar: "موارد التعلم" },
  "learning.subtitle": { en: "Curated courses from Coursera, edX, DeepLearning.AI, and more", ar: "دورات مميزة من Coursera و edX و DeepLearning.AI والمزيد" },
  "learning.noGaps": { en: "No skill gaps to address. You're doing great!", ar: "لا توجد فجوات مهارات لمعالجة. أنت ممتاز!" },
  "learning.resourceFor": { en: "Recommended Resources for {skill}", ar: "موارد مقترحة لـ {skill}" },
  "learning.levelHint": { en: "Current: Level {current} → Target: Level {target}", ar: "الحالي: المستوى {current} → الهدف: المستوى {target}" },
  "learning.gapSize": { en: "Level {current} → {target} ({gap} level gap)", ar: "المستوى {current} → {target} ({gap} فجوة مستوى" },
  "learning.resourcesCount": { en: "{n} resources", ar: "{n} مورد" },
  "learning.noResources": { en: "No curated resources available yet for this specific skill. Check", ar: "لا توجد موارد مميزة لهذه المهارة تحديدًا بعد. تحقق من" },
  "learning.courseraLink": { en: "Coursera", ar: "Coursera" },
  "learning.edxLink": { en: "edX", ar: "edX" },
  "learning.deeplearningLink": { en: "DeepLearning.AI", ar: "DeepLearning.AI" },
  "learning.searchCoursera": { en: "Search Coursera", ar: "ابحث في Coursera" },
  "learning.partners": { en: "Content partners:", ar: "شركاء المحتوى:" },
  "learning.resource.platform": { en: "{platform}", ar: "{platform}" },
  "learning.resource.format": { en: "{format}", ar: "{format}" },
  "learning.resource.hours": { en: "⏱ {n} hrs", ar: "⏱ {n} ساعات" },
  "learning.resource.levelReq": { en: "Level {n}+", ar: "المستوى {n}+" },
  "learning.resource.free": { en: "Free", ar: "مجاني" },
  "learning.resource.audit": { en: "Audit", ar: "تصفح مجاني" },
  "learning.resource.paid": { en: "Paid", ar: "مدفوع" },
  "learning.dismiss": { en: "Dismiss", ar: "إغلاق" },

  // ── Settings Page ──────────────────────────────────────────────────────────
  "settings.title": { en: "Settings", ar: "الإعدادات" },
  "settings.subtitle": { en: "Manage your account preferences and feature toggles.", ar: "ادManage تفضيلات حسابك وتبديل الميزات." },
  "settings.account": { en: "Account", ar: "الحساب" },
  "settings.accountDesc": { en: "Your Hirena account information", ar: "معلومات حسابك في هيرينا" },
  "settings.displayName": { en: "Display Name", ar: "اسم العرض" },
  "settings.email": { en: "Email", ar: "البريد الإلكتروني" },
  "settings.userId": { en: "User ID", ar: "معرف المستخدم" },
  "settings.mode": { en: "Mode", ar: "الوضع" },
  "settings.demo": { en: "Demo", ar: "تجريبي" },
  "settings.preferences": { en: "Preferences", ar: "التفضيلات" },
  "settings.preferencesDesc": { en: "Customize your assessment experience", ar: "خصص تجربة التقييم الخاصة بك" },
  "settings.languageLabel": { en: "Language", ar: "اللغة" },
  "settings.languageDesc": { en: "Interface language for Hirena", ar: "لغة الواجهة لهيرينا" },
  "settings.learningInterests": { en: "Learning Interests", ar: "مجالات التعلم المهتم بها" },
  "settings.learningInterestsDesc": { en: "Topics you're interested in for curated learning recommendations", ar: "المواضيع التي تهتم بها للحصول على توصيات تعلم مميزة" },
  "settings.useRealAi": { en: "Use Real AI (OpenAI)", ar: "استخدم الذكاء الاصطناعي الحقيقي (OpenAI)" },
  "settings.useRealAiDesc": { en: "Use GPT-4 for skill analysis instead of the built-in mock engine. Requires a valid API key.", ar: "استخدم GPT-4 لتحليل المهارات بدل المحرك المحاكى المدمج. يتطلب مفتاح API س유효." },
  "settings.aiDisclaimer": { en: "AI Disclaimer Acknowledged", ar: "إقرار إخلاء المسؤولية بالذكاء الاصطناعي" },
  "settings.aiDisclaimerDesc": { en: "Confirm you understand AI-generated assessments are coaching tools, not definitive evaluations.", ar: "أكد أنك تفهم أن التقييمات المولدة بالذكاء الاصطناعي هي أدوات توجيهية، ليست تقييمات نهائية." },
  "settings.noApiKey": { en: "No API key found", ar: "لم يتم العثور على مفتاح API" },
  "settings.noApiKeyDesc": { en: "OpenAI API key not configured. Enable mock mode instead.", ar: "مفتاح OpenAI API غير مُعد. فّعل وضع المحاكاة بدلاً من ذلك." },
  "settings.facialTitle": { en: "Facial Analysis (Experimental)", ar: "تحليل الوجه (تجريبي)" },
  "settings.facialDesc": { en: "Optional video-based facial expression analysis during interview practice.", ar: "تحليل تعبيرات الوجه الاختياري المستند إلى الفيديو أثناء تمارين المقابلة." },
  "settings.facialDescNote": { en: "This feature is experimental and may reflect biases. See documentation below.", ar: "هذه الميزة تجريبية وقد تعكس تحيزات. راجع الوثائق أدناه." },
  "settings.facialEnableLabel": { en: "Enable Facial Analysis", ar: "تفعيل تحليل الوجه" },
  "settings.facialEnableDesc": { en: "Analyze facial expressions, eye contact, and engagement from video responses.", ar: "حلل تعبيرات الوجه واتصال العين والتفاعل من ردود الفعل المرئية." },
  "settings.facialImportant": { en: "Important — Read Before Enabling", ar: "هام — اقرأ قبل التفعيل" },
  "settings.facialWarning": { en: "Facial analysis technology has known biases across race, gender, age, and neurodiversity. Hirena's implementation is a coaching aid only — never used for pass/fail decisions. You can disable this at any time. See the full bias documentation for details.", ar: "تقنية تحليل الوجه لها تحيزات معروفة عبر العرق، والجنس، والعمر، والتنوع العصبي.Implementationsهيرينا هي مساعدة توجيهية فقط — لا تُستخدم أبدًا لاتخاذ قرارات النجاح/الفشل. يمكنك تعطيل هذا في أي وقت. راجع الوثائق الكاملة عن التحيز للتفاصيل." },
  "settings.facialDocTitle": { en: "Facial Analysis Bias & Ethics Documentation", ar: "وثائق التحيز والأخلاقيات لتحليل الوجه" },
  "settings.facialDocDesc": { en: "Comprehensive overview of why facial analysis is controversial, known biases, regulatory context, and Hirena's ethical safeguards.", ar: "نظرة شاملة على سبب كون تحليل الوجه محل جدل، التحيزات المعروفة، السياق التنظيمي، وضمانات هيرينا الأخلاقية." },
  "settings.facialReadFull": { en: "Read full documentation", ar: "اقرأ الوثائق الكاملة" },
  "settings.saveAll": { en: "Save All Settings", ar: "حفظ كل الإعدادات" },
  "settings.saving": { en: "Saving...", ar: "جارٍ الحفظ..." },
  "settings.saved": { en: "All preferences saved", ar: "حفظ جميع التفضيلات" },

  // ── Auth Pages ─────────────────────────────────────────────────────────────
  "auth.signIn.title": { en: "Sign in to Hirena", ar: "تسجيل الدخول إلى هيرينا" },
  "auth.signIn.subtitle": { en: "Access your assessment history and track your career progress", ar: "وصول إلى تاريخ تقييماتك وتتبع تقدمك المهني" },
  "auth.signIn.cardTitle": { en: "Hello again", ar: "أهلاً مجددًا" },
  "auth.signIn.cardDesc": { en: "Enter your credentials to access your account", ar: "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك" },
  "auth.signUp.title": { en: "Create your Hirena account", ar: "أنشئ حسابك في هيرينا" },
  "auth.signUp.subtitle": { en: "Start assessing your skills and tracking your career growth", ar: "ابدأ تقييم مهاراتك وتتبع نموك المهني" },
  "auth.signUp.cardTitle": { en: "Join Hirena", ar: "انضم إلى هيرينا" },
  "auth.signUp.cardDesc": { en: "Create an account to save your assessments and track progress over time", ar: "أنشئ حسابًا لحفظ تقييماتك وتتبع تقدمك مع الوقت" },
  "auth.displayName": { en: "Display Name", ar: "اسم العرض" },
  "auth.email": { en: "Email", ar: "البريد الإلكتروني" },
  "auth.password": { en: "Password", ar: "كلمة المرور" },
  "auth.passwordMin": { en: "Min. 6 characters", ar: "6 أحرف على الأقل" },
  "auth.signInButton": { en: "Sign In", ar: "تسجيل الدخول" },
  "auth.signUpButton": { en: "Create Account", ar: "إنشاء حساب" },
  "auth.switchToSignUp": { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
  "auth.switchToSignIn": { en: "Already have an account?", ar: "هل لديك حساب بالفعل؟" },
  "auth.demoNotice": { en: "Demo mode — no server involved", ar: "وضع تجريبي — لا يوجد 서버 مشارك" },
  "auth.suppressNotice": { en: "Signed in via Supabase Auth", ar: "تم تسجيل الدخول عبر Supabase Auth" },
  "auth.quickAccess": { en: "Quick access (demo)", ar: "وصول سريع (تجريبي)" },
  "auth.continueDemo": { en: "Continue as Demo", ar: "متابعة كتجريبي" },
  "auth.demoNote": { en: "Skip account creation. Your data stays in this browser only.", ar: "تخطّى إنشاء حساب. بياناتك تبقى في هذا المتصفح فقط." },
  "auth.welcomeBack": { en: "Welcome back, {name}!", ar: "مرحبًا بعودتك، {name}!" },
  "auth.yourEmail": { en: "You're signed in as {email}", ar: "أنت مسجل الدخول ως {email}" },
  "auth.signOutButton": { en: "Sign out", ar: "تسجيل الخروج" },
  "auth.termsNote": { en: "By continuing, you agree to Hirena's Terms of Service and Privacy Policy. Demo mode stores data locally only.", ar: "بالمتابعة، أنت توافق على شروط خدمة هيرينا وسياسة الخصوصية. وضع التجريبي يخزن البيانات محليًا فقط." },
  "auth.noCardRequired": { en: "No credit card required. Free to use. Your data stays private.", ar: "لا يشترط بطاقة ائتمان. مجاني الاستخدام. بياناتك تظل خاصة." },

  // ── Benefits Cards (Sign-up) ───────────────────────────────────────────────
  "benefits.saveAssessments": { en: "Save assessments", ar: "حفظ التقييمات" },
  "benefits.saveAssessmentsDesc": { en: "Your results persist across sessions", ar: "نتائجك تستمر عبر الجلسات" },
  "benefits.trackProgress": { en: "Track progress", ar: "تتبع التقدم" },
  "benefits.trackProgressDesc": { en: "Compare assessments over time", ar: "قارن التقييمات مع الوقت" },
  "benefits.roadmap": { en: "Personalized roadmap", ar: "خارطة طريق مميزة" },
  "benefits.roadmapDesc": { en: "AI-powered development plan", ar: "خطة تطوير بالذكاء الاصطناعي" },
  "benefits.careerLadder": { en: "Career ladder viz", ar: "تصور سلم المهن" },
  "progress.trackingTitle": { en: "Progress Tracking", ar: "تتبع التقدم" },
  "progress.trackingSubtitle": { en: "Track your skills assessment history and growth over time", ar: "تتبع تاريخ تقييم مهاراتك ونموك مع الوقت" },
  "progress.latestAssessment": { en: "Latest Assessment", ar: "آخر تقييم" },
  "progress.overallScore": { en: "Overall Score", ar: "الدرجة العامة" },
  "progress.changeFromLast": { en: "Change from last", ar: "التغيير عن الأخير" },
  "progress.assessmentHistory": { en: "Assessment History", ar: "تاريخ التقييمات" },
  "progress.skillLevelTrajectory": { en: "Skill Level Trajectory", ar: "مسار مستوى المهارة" },
  "progress.singleAssessment": { en: "Single assessment", ar: "تقييم واحد" },
  "progress.assessmentComparison": { en: "Assessment Comparison", ar: "مقارنة التقييمات" },
  "progress.previousAssessment": { en: "Previous Assessment", ar: "التقييم السابق" },
  "progress.competencyAreaComparison": { en: "Competency Area Comparison", ar: "مقارنة مجالات الكفاءة" },
  "progress.assessmentCount": { en: "{n} assessment", ar: "{n} تقييم" },
  "progress.noAssessmentsYet": { en: "No assessments yet. Take your first assessment to start tracking your growth.", ar: "لا تقييمات بعد. خذ أول تقييم لك لتتبع نموك." },

  // ── Learning Resources Panel ─────────────────────────────────────────────────
  "resources.title": { en: "Learning Resources", ar: "موارد التعلم" },
  "resources.subtitle": { en: "Curated courses from Coursera, edX, DeepLearning.AI, and more", ar: "دورات مختارة من Coursera و edX و DeepLearning.AI والمزيد" },
  "resources.noGaps": { en: "No skill gaps to address. You're doing great!", ar: "لا توجد فجوات مهارة لمعالجتها. أنت تؤدي بشكل رائع!" },
  "resources.gapSize": { en: "Level {current} → {target} ({gap} level gap)", ar: "المستوى {current} → {target} (فجوة {gap} مستوى)" },
  "resources.resourcesCount": { en: "{n} resources", ar: "{n} موردًا" },
  "resources.expandLabel": { en: "View resources", ar: "عرض الموارد" },
  "resources.collapseLabel": { en: "Hide resources", ar: "إخفاء الموارد" },
  "resources.cardTitle": { en: "Recommended Resources for {skill}", ar: "الموارد المقترحة لـ {skill}" },
  "resources.close": { en: "Dismiss", ar: "إغلاق" },
  "resources.levelHint": { en: "Current: Level {current}/5 → Target: Level {target}/5", ar: "الحالي: المستوى {current}/5 → الهدف: المستوى {target}/5" },
  "resources.searchPlaceholder": { en: "Search courses...", ar: "البحث عن دورات..." },
  "resources.filterPlatform": { en: "Platform", ar: "المنصة" },
  "resources.allPlatforms": { en: "All platforms", ar: "كل المنصات" },
  "resources.filterCost": { en: "Cost", ar: "التكلفة" },
  "resources.allCosts": { en: "All costs", ar: "كل التكاليف" },
  "resources.free": { en: "Free", ar: "مجاني" },
  "resources.audit": { en: "Audit", ar: "تصفح مجاني" },
  "resources.paid": { en: "Paid", ar: "مدفوع" },
  "resources.bookmarkedOnly": { en: "Bookmarked only", ar: "المحفوظات فقط" },
  "resources.addBookmark": { en: "Add to bookmarks", ar: "إضافة إلى المحفوظات" },
  "resources.removeBookmark": { en: "Remove bookmark", ar: "إزالة المحفوظات" },
  "resources.noResults": { en: "No matching resources found.", ar: "لا توجد موارد مطابقة." },
  "resources.noResources": { en: "No resources mapped for this skill yet.", ar: "لا توجد موارد لهذه المهارة بعد." },
  "resources.level": { en: "Level {level}+", ar: "المستوى {level}+" },
  "resources.partners": { en: "Content partners:", ar: "شركاء المحتوى:" },
  "resources.clearFilters": { en: "Clear filters", ar: "مسح الفلاتر" },
  "resources.bookmarkCount": { en: "{count} bookmarked resources", ar: "{count} مورد محفوظ" },

  "settings.account.title": { en: "Account", ar: "الحساب" },
  "settings.account.description": { en: "Your Hirena account information", ar: "معلومات حساب Hirena الخاص بك" },
  "settings.labels.displayName": { en: "Display Name", ar: "اسم العرض" },
  "settings.labels.email": { en: "Email", ar: "البريد الإلكتروني" },
  "settings.labels.userId": { en: "User ID", ar: "معرف المستخدم" },
  "settings.labels.mode": { en: "Mode", ar: "الوضع" },
  "settings.preferences.title": { en: "Preferences", ar: "التفضيلات" },
  "settings.preferences.description": { en: "Customize your assessment experience", ar: "تخصيص تجربة التقييم الخاصة بك" },
  "settings.learningInterests.title": { en: "Learning Interests", ar: "م Norwich التعلم" },
  "settings.learningInterests.description": { en: "Topics you're interested in for curated learning recommendations", ar: "الموضوعات التي تهمك للحصول على توصي Daha بالتعلم" },
  "settings.useRealAi.label": { en: "Use Real AI (OpenAI)", ar: "استخدام الذكاء الاصطناعي الحقيقي (OpenAI)" },
  "settings.useRealAi.description": { en: "Use GPT-4 for skill analysis instead of the built-in mock engine. Requires a valid API key.", ar: "استخدم GPT-4 لتحليل المهارات بدلاً من المحرك المحاكى المدمج. يتطلب مفتاح API صالحًا." },
  "settings.aiDisclaimer.label": { en: "AI Disclaimer Acknowledged", ar: "الإقرار بخصوص الذكاء الاصطناعي" },
  "settings.aiDisclaimer.description": { en: "Confirm you understand AI-generated assessments are coaching tools, not definitive evaluations.", ar: "تأكيد أنك تفهم أن التقييمات التي يولدها الذكاء الاصطناعي هي أدوات إرشادية، وليست تقييمات نهائية." },
  "settings.facial.title": { en: "Facial Analysis (Experimental)", ar: "تحليل الوجه (تجريبي)" },
  "settings.facial.description": { en: "Optional video-based facial expression analysis during interview practice.", ar: "تحليل تعبيرات الوجه القائمة على الفيديو بشكل اختياري أثناء ممارسة المقابلات." },
  "settings.facial.disclaimerShort": { en: "This feature is experimental and may reflect biases. See documentation below.", ar: "هذه الميزة تجريبية وقد تعكس تحيزات. رؤية الوثائق أدناه." },
  "settings.facial.toggleLabel": { en: "Enable Facial Analysis", ar: "تفعيل تحليل الوجه" },
  "settings.facial.toggleDescription": { en: "Analyze facial expressions, eye contact, and engagement from video responses.", ar: "تحليل تعبيرات الوجه، تواصل العين، والمشاركة من ردود الفيديو." },
  "settings.facial.toggleDisclaimer": { en: "Voluntary opt-in only. Never used for rejection decisions. Results are coaching suggestions.", ar: "اختياري voluntary فقط. لا يستخدم أبدًا لقرارات الرفض. النتائج هي اقتراحات إرشادية." },
  "settings.mockModeLabel": { en: "Mock AI Mode", ar: "وضع الذكاء الاصطناعي المحاكى" },
  "settings.aiModeLabel": { en: "AI Mode", ar: "وضع الذكاء الاصطناعي" },
  "settings.mockModeSubtext": { en: "No OpenAI credits used — deterministic scoring", ar: "لا يتم استخدام اعتمادات OpenAI — التسجيل محدد" },
  "settings.aiModeSubtext": { en: "OpenAI GPT-4 powered analysis", ar: "تحليل مدعوم بـ OpenAI GPT-4" },

  // ── Progress Tracking Dashboard ──────────────────────────────────────────────

  // ── Mock AI Mode Indicator ─────────────────────────────────────────────────
  "mockMode.title": { en: "Mock AI Mode", ar: "وضع الذكاء الاصطناعي المحاكى" },
  "mockMode.realTitle": { en: "AI Mode", ar: "وضع الذكاء الاصطناعي" },
  "mockMode.mockDesc": { en: "No OpenAI credits used — deterministic scoring", ar: "لم تُستخدم أي ائتمانات OpenAI — تقييم محدد" },
  "mockMode.realDesc": { en: "OpenAI GPT-4 powered analysis", ar: "تحليل ب powered GPT-4 من OpenAI" },
  "mockMode.warn": { en: "This assessment used Hirena's built-in mock AI engine — no OpenAI credits were consumed. Connect a real API key to enable AI-powered skill analysis.", ar: "استخدم هذا التقييم محرك الذكاء الاصطناعي المحاكى المدمج في هيرينا — لم تُستهلك أي ائتمانات OpenAI. اتصل بمفتاح API حقيقي لتفعيل تحليل المهارات بالذكاء الاصطناعي." },

  // ── Facial Bias Doc (shown in modal) ───────────────────────────────────────
  "facialDoc.title": { en: "Facial Analysis Bias & Ethics", ar: "تحيز الأخلاقيات لتحليل الوجه" },
};

// ─── Options Dictionaries ──────────────────────────────────────────────────
// For dropdown options that differ by language (region, experience, goal, score labels).
// Type: Record<key, Record<lang, Record<value, label>>>

export const I18N_OPTIONS: Record<string, Record<Language, Record<string, string>>> = {
  "wizard.step1.experienceOptions": {
    en: { "0-1": "Less than 1 year", "1-3": "1-3 years", "3-5": "3-5 years", "5-10": "5-10 years", "10+": "10+ years" },
    ar: { "0-1": "أقل من سنة واحدة", "1-3": "1-3 سنوات", "3-5": "3-5 سنوات", "5-10": "5-10 سنوات", "10+": "10+ سنوات" },
  },
  "wizard.step1.regionOptions": {
    en: { "MENA": "Middle East & North Africa", "APAC": "Asia-Pacific", "NA": "North America", "EMEA": "Europe, Middle East & Africa" },
    ar: { "MENA": "الشرق الأوسط وشمال أفريقيا", "APAC": "آسيا والمحيط الهادئ", "NA": "أمريكا الشمالية", "EMEA": "أوروبا والشرق الأوسط وأفريقيا" },
  },
  "wizard.step2.goalOptions": {
    en: { "promotion": "Get promoted", "switch": "Switch roles", "learn": "Learn new skills", "interview": "Prepare for interview" },
    ar: { "promotion": "الحصول على ترقية", "switch": "تغيير الدور", "learn": "تعلم مهارات جديدة", "interview": "التحضير للمقابلة" },
  },
  "results.scoreLabels": {
    en: { "beginner": "Beginner", "developing": "Developing", "proficient": "Proficient", "advanced": "Advanced" },
    ar: { "beginner": "مبتدئ", "developing": "قيد التطوير", "proficient": "إجادة", "advanced": "متقدم" },
  },
};

// ─── Helper: get a translation ────────────────────────────────────────────────
export function t(key: string, lang: Language = "en", vars?: Record<string, string | number>): string {
  const entry = I18N[key];
  if (!entry) {
    // Fall back to key itself (helps identify missing strings in dev)
    return key;
  }
  let value = entry[lang] ?? entry["en"] ?? key;

  // Handle nested objects (e.g. scoreLabels, experienceOptions)
  if (typeof value === "object" && value !== null) {
    value = entry[lang] ?? entry["en"];
    if (typeof value === "object") {
      return JSON.stringify(value); // Shouldn't happen in practice
    }
  }

  // Interpolate variables like {n}, {skill}, {role}, etc.
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = (value as string).replace(new RegExp(`\{${k}\}`, "g"), String(v));
    }
  }

  return value as string;
}

// ─── Helper: pluralize based on count ────────────────────────────────────────
export function formatCount(n: number, _lang: Language): string {
  return String(n);
}

// ─── Detect language from stored prefs or browser ────────────────────────────
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("hirena_language");
  if (stored === "en" || stored === "ar") return stored;
  // Fall back to browser language
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "ar" ? "ar" : "en";
}

// ─── Types for translated options dictionaries ────────────────────────────────
export type OptionsDict = Record<string, string>;
export function optionsDict(key: string, lang: Language): OptionsDict | null {
  const entry = I18N[key];
  if (!entry) return null;
  const dict = entry[lang] ?? entry["en"];
  if (typeof dict === "object" && dict !== null && !Array.isArray(dict)) {
    return dict as OptionsDict;
  }
  return null;
}