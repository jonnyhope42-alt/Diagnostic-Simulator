import { GoogleGenAI, Type } from "@google/genai";
import { MedicalCase } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to generate a random seed-like medical concept
const getRandomSpecialty = () => {
  const specialties = [
    'Respiratory', 
    'Cardiology', 
    'Neurology', 
    'Gastroenterology', 
    'Endocrinology', 
    'Infectious Disease',
    'Hematology',
    'Nephrology',
    'Rheumatology',
    'Acute General Surgery',
    'Toxicology',
    'Immunology',
    'Vascular',
    'Urology',
    'Geriatrics',
    'Tropical Medicine'
  ];
  return specialties[Math.floor(Math.random() * specialties.length)];
};

export const generateMedicalCase = async (): Promise<MedicalCase> => {
  const specialty = getRandomSpecialty();
  const prompt = `
    Generate a high-fidelity, complex medical case study for a diagnostic simulation game.
    The patient presents with a condition related to: ${specialty}.
    
    The case should be challenging but solvable with careful investigation. 
    It can be a rare presentation of a common disease, or a classic presentation of a rare disease.
    Ensure the differentials cover a broad scope (e.g. mix of medical, surgical, or pyschosomatic if relevant).
    
    You must return a JSON object corresponding to this schema.
    The 'differentials' array must contain exactly 5 strings: 4 incorrect but plausible diagnoses, and 1 string matching the 'trueDiagnosis' exactly.
    Ensure 'trueDiagnosis' is one of the items in 'differentials'.
    
    The 'initialVitals' should be realistic for the condition.
    Use British English spelling (e.g., Haemoglobin, Oesophagus).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patientName: { type: Type.STRING },
            age: { type: Type.INTEGER },
            gender: { type: Type.STRING },
            presentingComplaint: { type: Type.STRING },
            historyOfPresentingComplaint: { type: Type.STRING },
            pastMedicalHistory: { type: Type.STRING },
            drugHistory: { type: Type.STRING },
            allergies: { type: Type.STRING },
            socialHistory: { type: Type.STRING },
            trueDiagnosis: { type: Type.STRING },
            differentials: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            initialVitals: {
              type: Type.OBJECT,
              properties: {
                hr: { type: Type.INTEGER },
                bp: { type: Type.STRING },
                rr: { type: Type.INTEGER },
                o2: { type: Type.INTEGER },
                temp: { type: Type.NUMBER },
                gcs: { type: Type.INTEGER }
              }
            }
          },
          required: ["patientName", "age", "gender", "trueDiagnosis", "differentials", "initialVitals"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MedicalCase;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Failed to generate case:", error);
    // Fallback mock case if API fails
    return {
      patientName: "John Doe",
      age: 45,
      gender: "Male",
      presentingComplaint: "Chest Pain",
      historyOfPresentingComplaint: "Sudden onset central chest pain radiating to left arm.",
      pastMedicalHistory: "Hypertension",
      drugHistory: "Amlodipine 5mg OD",
      allergies: "NKDA",
      socialHistory: "Smoker 20/day",
      trueDiagnosis: "Acute Coronary Syndrome",
      differentials: ["Acute Coronary Syndrome", "Pulmonary Embolism", "Aortic Dissection", "GORD", "Musculoskeletal Pain"],
      initialVitals: { hr: 110, bp: "150/95", rr: 22, o2: 96, temp: 37.1, gcs: 15 }
    };
  }
};

export const interpretTestResult = async (
  medicalCase: MedicalCase,
  testName: string,
  testCategory: string
): Promise<string> => {
  const prompt = `
    You are a medical simulator engine.
    Patient: ${medicalCase.age}y ${medicalCase.gender}.
    True Diagnosis: ${medicalCase.trueDiagnosis}.
    Presentation: ${medicalCase.presentingComplaint}.
    
    The user (doctor) has ordered: ${testName} (${testCategory}).
    
    Generate the text result for this test.
    - If it's a lab, provide values with units.
    - If it's imaging, describe the radiological findings.
    - If the test is irrelevant to the true diagnosis, return normal/unremarkable findings but keep it realistic for the patient's age.
    - Be brief, clinical, and professional. 
    - Do NOT reveal the diagnosis explicitly, just the findings.
    - Use British English spelling.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Test results inconclusive due to sample error. Please repeat.";
  } catch (error) {
    console.error("Error interpreting test:", error);
    return "Lab system offline. Please try again.";
  }
};