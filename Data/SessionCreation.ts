import mongoose from "mongoose";
import Session from "../models/Session";

export async function enterData(req: any, res: any){
    function findNextThursdayOrFriday(date: any) {
      const daysUntilThursday = 4 - date.getDay(); 
      if (daysUntilThursday <= 0) {
        date.setDate(date.getDate() + 7 + daysUntilThursday); 
      } else {
        date.setDate(date.getDate() + daysUntilThursday);
      }
      return date;
    }
    
    const createSessions = async () => {
      try {
        const sessionData: any = [];
        var startDate = new Date(2023, 8, 22);
        for (let i = 0; i < 15; i++) {
          const sessionDate = new Date(startDate);
          sessionDate.setHours(0, 0, 0, 0);
          console.log(sessionDate)
          const nextDate = sessionDate.getDate() + 7; 
          sessionDate.setDate(nextDate)
          startDate = sessionDate;
          const session: any = {
            date: sessionDate,
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            dean: '650ed5bd57c88a09ba7d737c', 
            deanAvailable: true,
          };
          sessionData.push(session);
        }
    
        for (const session of sessionData) {
          const newSession = new Session(session);
          await newSession.save();
        }
    
        console.log('Sessions created successfully');
        mongoose.connection.close();
      } catch (error) {
        console.error('Error creating sessions:', error);
      }
    };
  
    createSessions();
  }