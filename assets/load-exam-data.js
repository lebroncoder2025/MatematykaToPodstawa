/**
 * Script to dynamically load exam data from JSON files
 * Replaces hardcoded EXAMS array with data from arkusze/*/tasks.json
 */

// Map of exam directories to metadata
const examMetadata = {
  '2025': { year: 2025, title: 'Matura Maj 2025 – Poziom Podstawowy', date: 'Maj 2025', formula: '2023', examType: 'sesja', taskCount: 31, closedCount: 24, openCount: 7 },
  '2024': { year: 2024, title: 'Matura Maj 2024 – Poziom Podstawowy', date: 'Maj 2024', formula: '2023', examType: 'sesja', taskCount: 31, closedCount: 24, openCount: 7 },
  'diagnostyczny_XII_2024': { year: 2024, title: 'Arkusz diagnostyczny – Grudzień 2024', date: 'Grudzień 2024', formula: '2023', examType: 'diagnostyczny', taskCount: 31, closedCount: 24, openCount: 7 },
  'diagnostyczny_XII_2023': { year: 2023, title: 'Arkusz diagnostyczny – Grudzień 2023', date: 'Grudzień 2023', formula: '2023', examType: 'diagnostyczny', taskCount: 31, closedCount: 24, openCount: 7 },
  'diagnostyczny_XII_2022': { year: 2022, title: 'Arkusz diagnostyczny – Grudzień 2022', date: 'Grudzień 2022', formula: '2023', examType: 'diagnostyczny', taskCount: 31, closedCount: 24, openCount: 7 },
  'diagnostyczny_IX_2022': { year: 2022, title: 'Arkusz diagnostyczny – Wrzesień 2022', date: 'Wrzesień 2022', formula: '2023', examType: 'diagnostyczny', taskCount: 31, closedCount: 24, openCount: 7 },
  'pokazowy_III_2022': { year: 2022, title: 'Arkusz pokazowy – Marzec 2022', date: 'Marzec 2022', formula: '2023', examType: 'pokazowy', taskCount: 31, closedCount: 24, openCount: 7 }
};

const examDirs = [
  '2025', '2024',
  'diagnostyczny_XII_2024', 'diagnostyczny_XII_2023', 'diagnostyczny_XII_2022',
  'diagnostyczny_IX_2022',
  'pokazowy_III_2022'
];

let loadedExams = [];
let loadsCompleted = 0;

function loadExamData() {
  loadedExams = [];
  
  const promises = examDirs.map(dir => {
    const jsonPath = `arkusze/${dir}/tasks.json`;
    return fetch(jsonPath)
      .then(response => {
        if (!response.ok) {
          console.warn(`Could not load ${jsonPath}: ${response.status}`);
          return null;
        }
        return response.json();
      })
      .then(tasks => {
        if (tasks) {
          const metadata = examMetadata[dir];
          if (metadata) {
            // Convert tasks from JSON format to exam format
            const convertedTasks = tasks.map(task => {
              const solution = [];
              if (task.solution_step1 || task.solution_math1) {
                solution.push({
                  step: task.solution_step1 || '',
                  math: task.solution_math1 || ''
                });
              }
              if (task.solution_step2 || task.solution_math2) {
                solution.push({
                  step: task.solution_step2 || '',
                  math: task.solution_math2 || ''
                });
              }
              return {
                num: task.num,
                text: task.text,
                type: task.type,
                answer: task.answer,
                solution: solution.length > 0 ? solution : [{ step: '', math: '' }]
              };
            });
            
            return {
              year: metadata.year,
              title: metadata.title,
              date: metadata.date,
              formula: metadata.formula,
              examType: metadata.examType,
              pdfPath: `arkusze/${dir}/arkusz.pdf`,
              zasadyPath: `arkusze/${dir}/zasady.pdf`,
              taskCount: metadata.taskCount,
              closedCount: metadata.closedCount,
              openCount: metadata.openCount,
              tasks: convertedTasks
            };
          }
        }
        return null;
      })
      .catch(error => {
        console.warn(`Error loading ${jsonPath}:`, error);
        return null;
      });
  });
  
  Promise.all(promises).then(results => {
    loadedExams = results.filter(exam => exam !== null);
    // Sort by year (descending) then by date
    loadedExams.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      // Maintain order for same year exams (sesja -> diagnostyczne -> pokazowy)
      const typeOrder = { sesja: 0, diagnostyczny: 1, probny: 2, pokazowy: 3 };
      return (typeOrder[a.examType] || 99) - (typeOrder[b.examType] || 99);
    });
    
    if (loadedExams.length > 0) {
      // Replace EXAMS with loaded data
      window.EXAMS = loadedExams;
      
      // Re-render if renderExams function exists
      if (typeof renderExams === 'function') {
        renderExams();
      }
    }
  });
}

// Load when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadExamData);
} else {
  loadExamData();
}
