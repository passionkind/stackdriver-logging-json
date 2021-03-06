/* eslint-disable @typescript-eslint/ban-types */
import { convertClientMetadataToStdMetadata } from '../utils';
import { DataOutput, MetadataOutput, MetadataOutputParameter } from '../types/output';
import { RewriteKey } from '../types/utils';

export type MetadataOutputStd<M extends MetadataOutput = MetadataOutput> = Omit<
	M,
	'insertId' | 'labels' | 'sourceLocation' | 'spanId' | 'trace' | 'traceSampled' | 'operation'
> &
	RewriteKey<M, 'insertId'> &
	RewriteKey<M, 'labels'> &
	RewriteKey<M, 'sourceLocation'> &
	RewriteKey<M, 'spanId'> &
	RewriteKey<M, 'trace'> &
	RewriteKey<M, 'traceSampled'> &
	RewriteKey<M, 'operation'>;

export type FullMetadataOutputStdParameter = MetadataOutputStd<MetadataOutputParameter>;

export function entryToStd<M extends MetadataOutput, D extends DataOutput = DataOutput>(entry: {
	metadata: M;
	data: D;
}): MetadataOutputStd<M> & D {
	const { metadata, data } = entry;

	return {
		// spread payload on root first to not overwrite metadata
		...data,
		// add metadata
		...convertClientMetadataToStdMetadata(metadata),
	};
}
