interface BaseModel {
	createdAt: Date;
	updatedAt: Date;
	deleted: boolean;
}

export interface User extends BaseModel {
	nickname: string;
	gender: number;
	city: string;
}

export interface Porduct extends BaseModel {
	name: string;
	title: string;
	brand: string;
	provider: string;
	price: number;
	markingPrice: number;
	thumbnail: string;
	description: string;
	carousels: string[];

	createdAt: Date;
	updatedAt: Date;
	deleted: boolean;
}

export interface Category extends BaseModel {
	name: string;
}

export interface Label extends BaseModel {
	name: string;
}

export interface Order extends BaseModel {
	userId: string;
	orderNO: string;
}
