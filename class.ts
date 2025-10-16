type Role = "Representante" | "Suplente";

class Student {
  protected _name: string;
  protected _age: number;
  protected _date: Date;
  protected _class: string;

  constructor(name: string, age: number, date: Date, studentClass: string) {
    this._name = name;
    this._age = age;
    this._date = date;
    this._class = studentClass;
  }
}

class Representative extends Student {
  protected _role: Role;

  constructor(name: string, age: number, date: Date, studentClass :string, role : Role) {
    super(name, age, date, studentClass);
    this._role = role;
  }
}

// const aluno1 = new Student("Cibelle" , 15, Date("19/02/2010"), "1E");
