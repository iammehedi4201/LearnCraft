/**
 * NJ-24 — File Uploads & Static Assets
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ24FileUploads(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-24</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">File Uploads & Static Assets</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS uses Multer under the hood for file uploads. It provides interceptors to handle single or multiple files and a dedicated module to serve static content securely.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">In Express, you use `multer()` as middleware. In NestJS, you use `@UseInterceptors(FileInterceptor())` for a cleaner, decorator-based approach.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Single File Upload</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profile')
export class ProfileController {
  
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, \`\${file.fieldname}-\${uniqueSuffix}\${extname(file.originalname)}\`);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  }))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      message: 'Avatar uploaded successfully',
      filename: file.filename,
    };
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Multiple Files & Fields</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

// ✅ Upload multiple files from one field
@Post('gallery')
@UseInterceptors(FilesInterceptor('photos', 5)) // Max 5 files
uploadGallery(@UploadedFiles() files: Array<Express.Multer.File>) {
  return { count: files.length };
}

// ✅ Upload files from multiple different fields
@Post('complex')
@UseInterceptors(FileFieldsInterceptor([
  { name: 'avatar', maxCount: 1 },
  { name: 'background', maxCount: 1 },
]))
uploadComplex(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
  return files;
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Serving Static Assets</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/serve-static

// app.module.ts
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to uploads folder
      serveRoot: '/static',                      // Access via http://host/static/file.jpg
    }),
  ],
})
export class AppModule {}`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Implement a file upload endpoint for user avatars with a 2MB size limit</li>
            <li>Add validation to only allow <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">.jpg</code> and <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">.png</code> extensions</li>
            <li>Configure <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">ServeStaticModule</code> to serve the uploaded files publicly</li>
            <li>Bonus: Delete the old file from disk whenever a user updates their avatar</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj25-websockets" className="font-bold underline hover:text-emerald-600">NJ-25 — WebSockets (Real-time)</Link> to learn bidirectional communication.</p>
        </section>
      </div>
    </>
  );
}
