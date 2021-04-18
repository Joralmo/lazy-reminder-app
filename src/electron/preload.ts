import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld(
    'electronTools',
    {
        showBreaksIn: 1,
        intervalForBreaks: 15
    }
)
