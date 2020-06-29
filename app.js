//Kurs sınıfı
class Course{
    constructor(title,instructor,image){ //Kurs başlığı,eğitmen ve kurs resmi parametre olarak alınıyor
        this.courseId = Math.floor(Math.random()*1000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//UI sınıfı
class UI{

    //kursu listeye ekle
    addCourseToList(course){
        const list = document.getElementById('course-list');
        var html = `
        <tr>
            <td><img style="width:100px;" src="img/${course.image}"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm d-flex justify-content-center delete">Sil</td>
        </tr>`; //template literal string oluşturarak yaptım
    
        list.innerHTML += html;
    }

    //inputlardaki kontrol değerlerini sil
    clearControls(){
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = "";
    }

    //kursu sil
    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
        return true;
    }

    //bildirimleri göster
    showAlert(message,className){
        var alert = `
        <div class="alert bildirim alert-${className}">
            ${message}
        </div>
        `;
        const row = document.querySelector('.row');
        //parametreleri : beforeBegin,afterBegin,beforeEnd,afterEnd
        row.insertAdjacentHTML('beforeBegin',alert);
    
        setTimeout(()=>{
            document.querySelector('.bildirim').remove();
        },2000); //2 saniye sonra gelen alert sınıfına sahip olan elemanı siler
    }
}

//Depo sınıfı
class Storage{

    //local storageden bilgileri getirecek
    static getCourses(){
        let courses;
        if(localStorage.getItem('courses') === null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    //getCoursestan aldığı bilgileri gösterecek
    static displayCourses(){
        const courses = Storage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    //kursu local storage'a ekler
    static addCourse(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    }

    //kursu local storagedan siler
    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
            const courses = Storage.getCourses();
            courses.forEach((course,index)=>{
                if(course.courseId == id){
                    courses.splice(index,1);
                }
        });
        localStorage.setItem('courses',JSON.stringify(courses));
    }
}


}

//storage üzerinde kursumuz varsa görünür hale gelir
document.addEventListener('DOMContentLoaded',Storage.displayCourses());

//form üzerinde submit olayı gerçekleşir ise
document.getElementById('new-course').addEventListener('submit',
function(e){
    e.preventDefault();

    //form inputlarındaki değerleri alalım
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //Kurs objesini oluşturma
    const course = new Course(title,instructor,image);

    //UI objesini oluşturma
    const ui = new UI();
    
    //bildirim sisteminin hazırlanması
    if(title === '' || instructor === '' || image === ''){
        //eksik alan bildirimi
        ui.showAlert('Lütfen formu eksiksiz bir şekilde tamamlayınız','warning');
    }else{

        //kursu listeye ekle
        ui.addCourseToList(course);

        //Local storage'a kaydet
        Storage.addCourse(course);

        //kontrolleri sil
        ui.clearControls();

        //kurs eklendi bildirimi
        ui.showAlert('Kurs başarı ile eklendi','success');
    }

});

document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI(); //silme işlemimi ui nesnesi üzerinden yapacağım
    
    //kurs silme işlemi
    if(ui.deleteCourse(e.target)==true){

    //Local Storageden de sil
    Storage.deleteCourse(e.target);

    //kurs silindi bildirimi
    ui.showAlert('Kurs silindi','danger');

    }
});
