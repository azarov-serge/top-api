import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { format } from 'date-fns';

import { ensureDir, writeFile } from 'fs-extra';
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './mfile.class';
import {UPLOAD_PATH} from './files.constants';

@Injectable()
export class FilesService {
	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${UPLOAD_PATH}/${dateFolder}`;

		await ensureDir(uploadFolder);

		const res: FileElementResponse[] = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

			res.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});
		}

		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
